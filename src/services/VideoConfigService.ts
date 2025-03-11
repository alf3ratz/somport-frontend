import BaseService from './BaseService'

import { API_CONFIG } from '../config/api.config'

interface VideoConfigResponse {
  videoStreamList: string[]
}

class VideoConfigService extends BaseService {
  async getStreamConfig(): Promise<VideoConfigResponse> {
    const response = await fetch(this.getFullUrl(API_CONFIG.endpoints.video.streams), {
      method: 'POST',
      headers: this.getDefaultHeaders(),
    })

    return this.handleResponse(response)
  }

  private async handleResponse(response: Response): Promise<VideoConfigResponse> {
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Ошибка аутентификации')
    }
    return response.json()
  }
}

export default new VideoConfigService()
