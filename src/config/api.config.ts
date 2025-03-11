// src/config/api.config.ts

interface ApiEndpoints {
  auth: {
    login: string
    register: string
    refresh: string
  }
  users: {
    profile: string
    update: string
  }
  video: {
    streams: string
    status: string
  }
}

interface WebSocketConfig {
  baseUrl: string
  reconnectInterval: number
  protocols?: string[]
}

interface ApiConfig {
  version: string
  baseUrl: string
  endpoints: ApiEndpoints
  websocket: WebSocketConfig
  timeout: number
}

const ENV = process.env.NODE_ENV || 'development'

const config: { [key: string]: ApiConfig } = {
  development: {
    version: 'v1',
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
    endpoints: {
      auth: {
        login: '/auth/login',
        register: '/auth/registration',
        refresh: '/auth/refresh',
      },
      users: {
        profile: '/users/profile',
        update: '/users/update',
      },
      video: {
        streams: '/video-config/streams',
        status: '/video-config/status',
      },
    },
    websocket: {
      baseUrl: process.env.REACT_APP_WS_URL || 'ws://localhost:8080',
      reconnectInterval: 5000,
      protocols: ['video-protocol'],
    },
    timeout: 10000, // 10 секунд
  },
  production: {
    version: 'v1',
    baseUrl: process.env.REACT_APP_API_URL || 'https://api.example.com/v1',
    endpoints: {
      auth: {
        login: '/auth/login',
        register: '/auth/registration',
        refresh: '/auth/refresh',
      },
      users: {
        profile: '/users/profile',
        update: '/users/update',
      },
      video: {
        streams: '/video-config/streams',
        status: '/video-config/status',
      },
    },
    websocket: {
      baseUrl: process.env.REACT_APP_WS_URL || 'wss://api.example.com/ws',
      reconnectInterval: 5000,
      protocols: ['video-protocol'],
    },
    timeout: 15000, // 15 секунд
  },
}

export const API_CONFIG = config[ENV]
