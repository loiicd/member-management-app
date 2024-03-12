import { User, UserFormData } from '../types/user'
import { BaseApiClient } from './baseApiClient'

export class UserApiClient extends BaseApiClient {

  public async getUser(id: string): Promise<User> {
    const response = await this.axiosInstance.get(`user/${id}`)
    return { ...response.data, birthdate: new Date(response.data.birthdate) }
  }

  public async getUsers(searchTerm: string | null, sortAttribute: string | null, sortDirection: string | null, filter: string[] | null): Promise<User[]> {
    if (!sortAttribute) sortAttribute = 'firstname'
    if (!sortDirection) sortDirection = 'ASC'
    if (!filter) filter = []
    const response = await this.axiosInstance.get('user', { params: { searchTerm, sortAttribute, sortDirection, filter } })
    return response.data.map((user: any) => ({ ...user, birthdate: new Date(user.birthdate) }))
  }

  public async createUser(userFormData: UserFormData): Promise<any> {
    return await this.axiosInstance.post('user', userFormData)
  }

  public async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.axiosInstance.put(`user/password/${userId}`, { newPassword })
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.axiosInstance.delete(`user/${userId}`)
  }
}