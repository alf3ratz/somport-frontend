import BaseService from './BaseService'

import { API_CONFIG } from '../config/api.config'

export interface FeedConfigResponse {
  id: number
  config: FeedConfigDetails
}

export interface FeedConfigDetails {
  feedCount: number
  poolNumber: number
}

class FeedConfigService extends BaseService {
  async getAllConfigs(): Promise<FeedConfigResponse[]> {
    const response = await fetch(this.getFullUrl(API_CONFIG.endpoints.feedConfig.getAll), {
      method: 'GET',
      headers: this.getDefaultHeaders(),
    })

    return this.handleResponseArray(response)
  }

  async updateConfig(id: number, request: FeedConfigResponse): Promise<FeedConfigResponse> {
    const response = await fetch(this.getFullUrl(`${API_CONFIG.endpoints.feedConfig.update}/${id}`), {
      method: 'PUT',
      headers: this.getDefaultHeaders(),
      body: JSON.stringify(request),
    })

    return this.handleResponse(response)
  }

  async createConfig(request: FeedConfigResponse): Promise<FeedConfigResponse> {
    const response = await fetch(this.getFullUrl(`${API_CONFIG.endpoints.feedConfig.create}`), {
      method: 'POST',
      headers: this.getDefaultHeaders(),
      body: JSON.stringify(request),
    })

    return this.handleResponse(response)
  }

  async deleteConfig(id: number): Promise<FeedConfigResponse> {
    const response = await fetch(this.getFullUrl(`${API_CONFIG.endpoints.feedConfig.delete}`), {
      method: 'DELETE',
      headers: this.getDefaultHeaders(),
    })

    return this.handleResponse(response)
  }

  private async handleResponseArray(response: Response): Promise<FeedConfigResponse[]> {
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Ошибка получения конфигурации')
    }
    return response.json()
  }

  private async handleResponse(response: Response): Promise<FeedConfigResponse> {
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Ошибка получения конфигурации')
    }
    return response.json()
  }
}

export default new FeedConfigService()
