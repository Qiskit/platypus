import { KernelManager, KernelAPI, ServerConnection } from '@jupyterlab/services'
import { IKernelConnection } from '@jupyterlab/services/lib/kernel/kernel'

export { IKernelConnection }

export const serverOptions = {
  bootstrap: false,
  preRenderHook: false,
  stripPrompts: false,
  requestKernel: true,
  predefinedOutput: true,
  mountStatusWidget: true,
  mountActivateWidget: true,
  mathjaxUrl: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js',
  mathjaxConfig: 'TeX-AMS_CHTML-full,Safe',
  selector: '[data-executable]',
  outputSelector: '[data-executable-output]',
  mountRunButton: true,
  mountRestartButton: true,
  mountRestartallButton: true,
  binderOptions: {
    repo: 'qiskit-community/platypus',
    ref: 'binder-env',
    binderUrl: 'https://mybinder.org',
    savedSession: {
      enabled: true,
      maxAge: 86400,
      storagePrefix: 'thebe-binder-'
    }
  },
  codeMirrorconfig: {
    lineWrapping: false
  },
  codeMirrorConfig: {
    theme: 'abcdef',
    mode: 'python'
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

export function requestBinderKernel () {
  // request a Kernel from Binder
  // this strings together requestBinder and requestKernel.
  // returns a Promise for a running Kernel.
  return requestBinder().then((serverSettings: any) => {
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

/*
async function getExistingServer () {
  try {
    if (!savedSession.enabled) {
      return
    }
    const storedInfoJSON = window.localStorage.getItem(storageKey)
    if (storedInfoJSON == null) {
      console.debug('No session saved in ', storageKey)
      return
    }
    console.debug('Saved binder session detected')
    const existingServer = JSON.parse(storedInfoJSON)
    const lastUsed = new Date(existingServer.lastUsed)
    const ageSeconds = (new Date() - lastUsed) / 1000
    if (ageSeconds > savedSession.maxAge) {
      console.debug(
        `Not using expired binder session for ${existingServer.url} from ${lastUsed}`
      )
      window.localStorage.removeItem(storageKey)
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
      console.log(
        'Saved binder connection appears to be invalid, requesting new session',
        err
      )
      window.localStorage.removeItem(storageKey)
      return
    }
    // refresh lastUsed timestamp in stored info
    existingServer.lastUsed = new Date()
    window.localStorage.setItem(storageKey, JSON.stringify(existingServer))
    console.log(
      `Saved binder session is valid, reusing connection to ${existingServer.url}`
    )
    return settings
  } catch (err) {
    // catch unhandled errors such as JSON parse errors,
    // invalid formats, permission error on localStorage, etc.
    console.error('Failed to load existing server connection', err)
  }
  return
}
*/

export function requestBinder (
) {
  const binderUrl = serverOptions.binderOptions.binderUrl
  const ref = serverOptions.binderOptions.ref
  const repo = serverOptions.binderOptions.repo
  const savedSession = serverOptions.binderOptions.savedSession
  const url = buildBinderUrlToRepo(repo, binderUrl, ref)
  const storageKey = savedSession.storagePrefix + url
  console.log('binder url', binderUrl)
  console.log('binder ref', ref)
  console.log('binder repo', repo)
  console.log('binder savedSession', savedSession)
  console.log('binder build URL', url)
  console.log('binder storageKey', storageKey)

  return new Promise(async (resolve, reject) => {
    // if binder already spawned our server and we remember the creds
    // try to reuse it
    // const existingServer = await getExistingServer()
    /*
    if (existingServer) {
      // found an existing server
      // return it instead of requesting a new one
      resolve(existingServer)
      return
    }
    */
    /*
    events.trigger('status', {
      status: 'building',
      message: 'Requesting build from binder'
    })
    */

    console.log('status')
    console.log({
      status: 'building',
      message: 'Requesting build from binder'
    })

    const es = new EventSource(url)
    es.onerror = (err) => {
      console.error('Lost connection to ' + url, err)
      es.close()
      /*
      events.trigger('status', {
        status: 'failed',
        message: 'Lost connection to Binder',
        error: err
      })
      */
      reject(new Error('Lost connection to'))
    }

    let phase: string = ''
    es.onmessage = (evt) => {
      const msg = JSON.parse(evt.data)
      if (msg.phase && msg.phase !== phase) {
        phase = msg.phase
        console.log('Binder phase: ' + phase)
        let status = phase
        if (status === 'ready') {
          status = 'server-ready'
        }
        /*
        events.trigger('status', {
          status,
          message: 'Binder is ' + phase,
          binderMessage: msg.message
        })
        */
      }
      if (msg.message) {
        console.log('Binder: ' + msg.message)
      }
      switch (msg.phase) {
        case 'failed':
          console.error('Failed to build', url, msg)
          es.close()
          reject(new Error(msg))
          break
        case 'ready':
          es.close()
          try {
            // save the current connection url+token to reuse later
            window.localStorage.setItem(
              storageKey,
              JSON.stringify({
                url: msg.url,
                token: msg.token,
                lastUsed: new Date()
              })
            )
          } catch (e) {
            // storage quota full, gently ignore nonfatal error
            console.warn(
              "Couldn't save thebe binder connection info to local storage",
              e
            )
          }

          resolve(
            ServerConnection.makeSettings({
              baseUrl: msg.url,
              wsUrl: 'ws' + msg.url.slice(4),
              token: msg.token,
              appendToken: true
            })
          )
          break
        default:
        // console.log(msg);
      }
    }
  })
}

// requesting Kernels
export function requestKernel () {
  // request a new Kernel
  const kernelOptions = serverOptions.kernelOptions
  const serverSettings = ServerConnection.makeSettings(
    kernelOptions.serverSettings
  )
  /*
  events.trigger('status', {
    status: 'starting',
    message: 'Starting Kernel'
  })
  */

  const km = new KernelManager({ serverSettings })
  return km.ready
    .then(() => {
      return km.startNew(kernelOptions)
    })
    .then((kernel) => {
      /*
      events.trigger('status', {
        status: 'ready',
        message: 'Kernel is ready',
        kernel
      })
      */
      return kernel
    })
}
