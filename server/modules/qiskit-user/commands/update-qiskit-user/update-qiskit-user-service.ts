import pickBy from 'lodash/pickBy'

import { QiskitUser } from '../../database/qiskit-user-entity'
import { QiskitUserMapper } from '../../database/qiskit-user-mapper'
import { QiskitUserRepository } from '../../database/qiskit-user-repository'
import { UpdateQiskitUserHttpRequest } from './update-qiskit-user-dto'

export class UpdateQiskitUserService {
  static async execute (updateQiskitUserHttpRequest: UpdateQiskitUserHttpRequest) {
    const qiskitUserMapper = new QiskitUserMapper()

    const qiskitUserRepository = new QiskitUserRepository(QiskitUser, qiskitUserMapper)

    const newFields = pickBy(updateQiskitUserHttpRequest, field => field !== undefined)

    const updatedQiskitUser = await qiskitUserRepository.updateOrCreateQiskitUserFilteredByUser(updateQiskitUserHttpRequest.user, newFields)

    return updatedQiskitUser
  }
}
