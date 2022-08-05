import got from 'got'

import { logger } from '../logger/logger'

import { LoginWithToken } from './quantum-computing-domain'
import { QC_URL, isQCHttpError } from './quantum-computing-utilities'

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
