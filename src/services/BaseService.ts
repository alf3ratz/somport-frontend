import { API_CONFIG } from '../config/api.config'

class BaseService {
  protected baseUrl = API_CONFIG.baseUrl

  protected getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`
  }

  protected getDefaultHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    }
  }
}

export default BaseService
