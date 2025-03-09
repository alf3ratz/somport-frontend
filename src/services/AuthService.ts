interface AuthResponse {
  accessToken: string
  refreshToken: string
}

export default class AuthService {
  private static readonly BASE_URL = 'http://localhost:8080'

  static async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    return this.handleResponse(response)
  }

  static async register(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.BASE_URL}/registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    return this.handleResponse(response)
  }

  private static async handleResponse(response: Response): Promise<AuthResponse> {
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Ошибка аутентификации')
    }
    return response.json()
  }
}
