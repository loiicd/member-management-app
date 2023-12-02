export type User = {
  id: string,
  firstname: string,
  lastname: string,
  birthdate?: Date | null,
  address?: string | null,
  email?: string | null,
  phone?: string | null,
}

export type UserFormData = {
  firstname: string,
  lastname: string,
  birthdate?: Date | null,
  address?: string | null,
  email?: string | null,
  phone?: string | null,
}