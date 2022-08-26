interface QiskitUser {
  apiToken?: string,
  user: string
}

let promise: Promise<QiskitUser> | undefined

export const getQiskitUser = () : Promise<QiskitUser> => {
  if (!promise) {
    promise = fetch('/qiskit-user').then(res => res.json())
  }
  return promise
}
