import { QiskitUser } from '../../database/qiskit-user-entity'
import { QiskitUserMapper } from '../../database/qiskit-user-mapper'
import { QiskitUserRepository } from '../../database/qiskit-user-repository'
import { QiskitUserNotFound } from '../../exceptions/qiskit-user-not-found'
import { FindQiskitUserByUserHttpRequest } from './find-qiskit-user-dto'

export class FindQiskitUserByUserService {
  static async execute (findQiskitUserByUserHttpRequest: FindQiskitUserByUserHttpRequest) {
    const qiskitUserMapper = new QiskitUserMapper()

    const qiskitUserRepository = new QiskitUserRepository(QiskitUser, qiskitUserMapper)

    const qiskitUser = await qiskitUserRepository.findOneByUser(findQiskitUserByUserHttpRequest)

    if (!qiskitUser) {
      throw new QiskitUserNotFound(findQiskitUserByUserHttpRequest.params.user)
    }
    return qiskitUser
  }
}
