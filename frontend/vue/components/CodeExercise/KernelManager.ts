/* eslint-disable no-console */
import { KernelManager, KernelAPI, ServerConnection } from '@jupyterlab/services'
import { IKernelConnection } from '@jupyterlab/services/lib/kernel/kernel'

export { IKernelConnection }

export const serverOptions = {
  binderOptions: {
    repo: 'qiskit-community/platypus',
    ref: 'binder-env',
    binderUrl: 'https://mybinder.org',
    savedSession: {
      enabled: true,
      maxAge: 86400,
      storagePrefix: 'qiskit-binder-'
    }
  },
  kernelOptions: {
    name: 'python3',
    kernelName: 'python3',
    path: '.',
    serverSettings: {
      appendToken: true
    }
  }
}

export const events = new EventTarget()

export function requestBinderKernel () {
  // request a Kernel from Binder
  // this strings together requestBinder and requestKernel.
  // returns a Promise for a running Kernel.
  return requestBinder().then((serverSettings: any) => {
    console.debug('Recovered settings =====================')
    serverOptions.kernelOptions.serverSettings = serverSettings
    serverOptions.kernelOptions.serverSettings.appendToken = true
    return requestKernel()
  })
}

function buildBinderUrlToRepo (repo: string, binderUrl: string, ref: string) {
  // trim github.com from repo
  let cleanRepo = repo.replace(/^(https?:\/\/)?github.com\//, '')
  // trim trailing or leading '/' on repo
  cleanRepo = cleanRepo.replace(/(^\/)|(\/?$)/g, '')
  // trailing / on binderUrl
  const cleanBinderUrl = binderUrl.replace(/(\/?$)/g, '')

  return cleanBinderUrl + '/build/gh/' + cleanRepo + '/' + ref
}

function makeSettings (msg: any) {
  return ServerConnection.makeSettings({
    baseUrl: msg.url,
    wsUrl: 'ws' + msg.url.slice(4),
    token: msg.token,
    appendToken: true
  })
}

function isExpiredSession (existingServer: any, maxAge: number) {
  const lastUsed = existingServer.lastUsed
  const now = new Date().getTime()
  const ageSeconds = (now - lastUsed) / 1000

  return ageSeconds > maxAge
}

function getStoredServer (storageKey: string, maxAge: number) {
  const storedInfoJSON = window.localStorage.getItem(storageKey)
  if (storedInfoJSON === null) {
    console.debug('No session saved in ', storageKey)
    return
  }
  console.debug('Saved binder session detected')

  let existingServer
  try {
    existingServer = JSON.parse(storedInfoJSON)
  } catch {
    console.debug('Bad JSON format')
    return
  }

  if (isExpiredSession(existingServer, maxAge)) {
    console.debug(`Not using expired binder session for ${existingServer.url} from ${existingServer.lastUsed}`)
    window.localStorage.removeItem(storageKey)
    return
  }

  return existingServer
}

async function getExistingServer (savedSession: any, storageKey: string) {
  if (!savedSession.enabled) {
    return
  }

  const existingServer = getStoredServer(storageKey, savedSession.maxAge)
  if (!existingServer) {
    return
  }

  const settings = ServerConnection.makeSettings({
    baseUrl: existingServer.url,
    wsUrl: 'ws' + existingServer.url.slice(4),
    token: existingServer.token,
    appendToken: true
  })

  try {
    await KernelAPI.listRunning(settings)
  } catch (err) {
    console.debug('Saved binder connection appears to be invalid, requesting new session', err)
    window.localStorage.removeItem(storageKey)
    return
  }

  existingServer.lastUsed = new Date().getTime()
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(existingServer))
  } catch (err) {
    console.warn('localStorage.setItem failed, not saving session locally', err)
  }

  return settings
}

function logBuildingStatus () {
  const detail = {
    status: 'binder-building',
    message: 'Requesting build from binder'
  }

  events.dispatchEvent(new CustomEvent('status', { detail }))

  console.debug('status')
  console.debug(detail)
}

function logLostConnection (url: string, err: any) {
  const errorMessage = `Lost connection to Binder: ${url}`
  const detail = {
    status: 'binder-failed',
    message: errorMessage,
    error: err
  }
  console.error(errorMessage, err)
  events.dispatchEvent(new CustomEvent('status', { detail }))
}

function logBinderPhase (status: string, binderMessage: string) {
  const message = `Phase: Binder is ${status}`
  console.debug(message)
  const detail = {
    status: `binder-${status}`,
    message,
    binderMessage
  }
  events.dispatchEvent(new CustomEvent('status', { detail }))
}

function logBinderMessage (message: string) {
  if (message) {
    console.debug(`Binder: ${message}`)
  }

  events.dispatchEvent(new CustomEvent('message', { detail: { message } }))
}

export async function requestBinder () {
  const binderUrl = serverOptions.binderOptions.binderUrl
  const ref = serverOptions.binderOptions.ref
  const repo = serverOptions.binderOptions.repo
  const savedSession = serverOptions.binderOptions.savedSession
  const url = buildBinderUrlToRepo(repo, binderUrl, ref)
  const storageKey = savedSession.storagePrefix + url
  console.debug('binder url', binderUrl)
  console.debug('binder ref', ref)
  console.debug('binder repo', repo)
  console.debug('binder savedSession', savedSession)
  console.debug('binder build URL', url)
  console.debug('binder storageKey', storageKey)

  const existingServer = await getExistingServer(savedSession, storageKey)
  if (existingServer) {
    return existingServer
  }

  logBuildingStatus()

  return new Promise((resolve, reject) => {
    const es = new EventSource(url)
    es.onerror = (err) => {
      es.close()
      logLostConnection(url, err)
      reject(new Error('Lost connection to the server'))
    }

    let lastPhase: string = ''
    es.onmessage = (evt) => {
      const msg = JSON.parse(evt.data)

      if (msg.phase && msg.phase !== lastPhase) {
        lastPhase = msg.phase
        logBinderPhase(msg.phase, msg.message || '')
      }

      logBinderMessage(msg.message)

      switch (msg.phase) {
        case 'failed':
          console.error('Failed to build', url, msg)
          es.close()
          reject(new Error(msg))
          break
        case 'ready':
          console.debug('Binder ready, storing server and resolve', msg)
          es.close()
          storeServer(storageKey, msg)
          resolve(makeSettings(msg))
          break
        default:
        // console.log(msg);
      }
    }
  })
}

function storeServer (key: string, msg: {url: string, token: string}) {
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        url: msg.url,
        token: msg.token,
        lastUsed: new Date()
      })
    )
  } catch (e) {
    // storage quota full, gently ignore nonfatal error
    console.warn("Couldn't save thebe binder connection info to local storage", e)
  }
}

// requesting Kernels
export function requestKernel () {
  // request a new Kernel
  const kernelOptions = serverOptions.kernelOptions
  const serverSettings = ServerConnection.makeSettings(kernelOptions.serverSettings)

  events.dispatchEvent(new CustomEvent('status', {
    detail: {
      status: 'starting',
      message: 'Starting Kernel'
    }
  }))

  const km = new KernelManager({ serverSettings })
  return km.ready
    .then(() => {
      return km.startNew(kernelOptions)
    })
    .then((kernel: IKernelConnection) => {
      events.dispatchEvent(new CustomEvent('status', {
        detail: {
          status: 'ready',
          message: 'Kernel is ready',
          kernel
        }
      }))
      return kernel
    })
}
