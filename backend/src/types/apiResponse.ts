export type ApiResponse = UserCreatedResponse | MailExistsResponse | RelExistsResponse

type UserCreatedResponse = {
  type: 'userCreated'
}

type MailExistsResponse = {
  type: 'mailExists',
  userId: string
}

type RelExistsResponse = {
  type: 'relExists'
  userId: string
}