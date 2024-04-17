type ErrorName = 'USER_NOT_FOUND' | 'USER_ALREADY_IN_ACCOUNT' | 'EMAIL_ALREADY_EXISTS'

export class ValidateError extends Error {
  name: ErrorName
  message: string

  constructor(name: ErrorName, message: string) {
    super(message)
    this.name = name
  }
}