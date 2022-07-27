import got from 'got'

import { logger } from '../logger/logger'

import { IS_PRODUCTION } from '../../configuration'

const QC_URL = IS_PRODUCTION ? 'https://auth.quantum-computing.ibm.com/api' : 'https://auth-dev.quantum-computing.ibm.com/api'

interface LoginWithToken {
  id: string,
  ttl: number,
  created: string,
  userId: string
}

interface QCHttpError {
  message: string
}

const isQCHttpError = (error: any): error is QCHttpError => {
  return typeof error?.message === 'string'
}

export class QuantumComputingRepository {
  static async getUserId (apiToken: string) {
    try {
      const { userId } = await got.post(`${QC_URL}/users/loginWithToken`, { json: { apiToken } }).json<LoginWithToken>()
      return userId
    } catch (error) {
      if (isQCHttpError(error)) {
        logger.error(error.message)
      }
      return undefined // This method it's a best effort if it doesn't work we return an undefined
    }
  }
}
