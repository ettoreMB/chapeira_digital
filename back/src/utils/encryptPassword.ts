import { createHmac } from 'crypto'

export function encrypt(password: string) {
  const hash = createHmac('sha256', '@Mepm24121968')
  const encryptPassword = hash.update(password).digest('hex')
  return encryptPassword
}

export function verifyPassword(password: string, hasedPassword: string) {
  return encrypt(password) === hasedPassword
}
