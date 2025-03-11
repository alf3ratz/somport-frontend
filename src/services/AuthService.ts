import BaseService from './BaseService'

import { API_CONFIG } from '../config/api.config'
interface AuthResponse {
  accessToken: string
  refreshToken: string
}

class AuthService extends BaseService {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(this.getFullUrl(API_CONFIG.endpoints.auth.login), {
      method: 'POST',
      headers: this.getDefaultHeaders(),
      body: JSON.stringify({ username, password }),
    })

    return this.handleResponse(response)
  }

  async register(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(this.getFullUrl(API_CONFIG.endpoints.auth.register), {
      method: 'POST',
      headers: this.getDefaultHeaders(),
      body: JSON.stringify({ username, password }),
    })

    return this.handleResponse(response)
  }

  private async handleResponse(response: Response): Promise<AuthResponse> {
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Ошибка аутентификации')
    }
    return response.json()
  }
}

export default new AuthService()
