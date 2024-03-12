import { UserApiResponse } from '../types/apiResponse'
import { User, UserFormData } from '../types/user'
import { BaseApiClient } from './baseApiClient'

export class UserApiClient extends BaseApiClient {

  public async getUser(id: string): Promise<User> {
    const response = await this.axiosInstance.get(`user/${id}`)
    return { ...response.data, birthdate: new Date(response.data.birthdate) }
  }

  public async getUsers(searchTerm: string | null, sortAttribute: string | null = 'firstname', sortDirection: string | null = 'ASC', filter: string | null = '', page: string | null = '1'): Promise<UserApiResponse> {
    const response = await this.axiosInstance.get('user', { params: { searchTerm, sortAttribute, sortDirection, filter, page } })
    const data = response.data.data.map((user: any) => ({ ...user, birthdate: new Date(user.birthdate) }))
    return { ...response.data, data }
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