import { BehaviorSubject, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { API_CONFIG } from '../config/api.config'

class VideoStreamService {
  private socket: WebSocket | null = null
  private destroy$ = new Subject<void>()
  private reconnectInterval = 5000

  // Публичные потоки данных
  public imageSource$ = new BehaviorSubject<string | null>(null)
  public connectionStatus$ = new BehaviorSubject<boolean>(false)

  connect(streamId: string) {
    this.disconnect()

    const wsUrl = `${API_CONFIG.websocket.baseUrl}/video-stream/${streamId}`
    this.socket = new WebSocket(wsUrl)
    this.socket.binaryType = 'arraybuffer'

    this.socket.onopen = () => {
      this.connectionStatus$.next(true)
      console.log(`✅ Connected to ${streamId}`)
    }

    this.socket.onmessage = (event: MessageEvent) => {
      if (event.data instanceof ArrayBuffer) {
        const blob = new Blob([event.data], { type: 'image/jpeg' })
        const imageUrl = URL.createObjectURL(blob)
        this.imageSource$.next(imageUrl)
      }
    }

    this.socket.onclose = () => {
      this.connectionStatus$.next(false)
      console.log(`❌ Disconnected from ${streamId}`)
      //this.scheduleReconnect(streamId)
    }

    this.socket.onerror = (err) => {
      console.error(`🚨 WebSocket Error:`, err)
      this.connectionStatus$.next(false)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    this.destroy$.next()
    this.destroy$.complete()
    this.imageSource$.next(null)
  }

  private scheduleReconnect(streamId: string) {
    setTimeout(() => {
      this.connect(streamId)
    }, this.reconnectInterval)
  }
}

export const videoStreamService = new VideoStreamService()
