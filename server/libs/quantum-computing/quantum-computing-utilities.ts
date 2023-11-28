import { IS_PRODUCTION } from '../../configuration'

import { QCHttpError } from './quantum-computing-domain'

export const QC_URL = IS_PRODUCTION ? 'https://auth.quantum.ibm.com/api' : 'https://auth-dev.quantum.ibm.com/api'

export const isQCHttpError = (error: any): error is QCHttpError => {
  return typeof error?.message === 'string'
}
