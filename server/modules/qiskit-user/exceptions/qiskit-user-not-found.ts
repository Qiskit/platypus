import { ExceptionBase } from '../../../libs/exceptions/exception-base'
import { QiskitUserExceptionNames } from './qiskit-user-exception-names'

export class QiskitUserNotFound extends ExceptionBase {
  constructor (id?: string) {
    super(`Qiskit user ${id} not found`)
  }

  readonly code = 404

  readonly name = QiskitUserExceptionNames.qiskitUserNotFound
}
