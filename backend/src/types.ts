export type User = {
  id: string,
  firstname: string,
  lastname: string,
  birthdate?: Date | null,
  address?: string | null
}

export type UserFormData = {
  firstname: string,
  lastname: string,
  birthdate?: Date | null,
  address?: string | null
}