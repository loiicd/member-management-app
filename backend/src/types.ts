export type User = {
  id: string,
  firstname: string,
  lastname: string,
  birthdate?: Date,
  address?: string
}

export type UserFormData = {
  firstname: string,
  lastname: string,
  birthdate?: Date,
  address?: string
}