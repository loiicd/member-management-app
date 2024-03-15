import { ApiResponse, UserApiResponse } from '../types/apiResponse'
import { User, UserFormData } from '../types/user'
import { BaseApiClient } from './baseApiClient'

export class UserApiClient extends BaseApiClient {

  public async getUser(id: string): Promise<User> {
    const response = await this.axiosInstance.get(`user/${id}`)
    return { ...response.data, birthdate: new Date(response.data.birthdate), created_at: new Date(response.data.created_at), updated_at: new Date(response.data.updated_at) }
  }

  public async getUsers(searchTerm: string | null, sortAttribute: string | null = 'firstname', sortDirection: string | null = 'ASC', filter: string | null = '', page: string | null = '1'): Promise<UserApiResponse> {
    const response = await this.axiosInstance.get('user', { params: { searchTerm, sortAttribute, sortDirection, filter, page } })
    const data = response.data.data.map((user: any) => ({ ...user, birthdate: new Date(user.birthdate), created_at: new Date(response.data.created_at), updated_at: new Date(response.data.updated_at) }))
    return { ...response.data, data }
  }

  public async createUser(userFormData: UserFormData): Promise<ApiResponse> {
    return (await this.axiosInstance.post('user', userFormData)).data
  }

  public async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.axiosInstance.put(`user/password/${userId}`, { newPassword })
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.axiosInstance.delete(`user/${userId}`)
  }

  public async checkEMail(email: string): Promise<boolean> {
    const response = await this.axiosInstance.get(`user/email/${email}`)
    return response.data.emailExists
  }

  public async createUserOrgRel(email: string): Promise<void> {
    await this.axiosInstance.post(`user/orgrel/${email}`)   
  }
}