import React, { useEffect, useRef, useState } from 'react'

const VideoStream: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const videoRef = useRef<HTMLImageElement | null>(null)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    console.log('🔄 Подключение к WebSocket...')
    socketRef.current = new WebSocket('ws://localhost:8080/video-stream')

    // Указываем, что ожидаем бинарные данные
    socketRef.current.binaryType = 'arraybuffer'

    socketRef.current.onopen = () => {
      console.log('✅ WebSocket подключен!')
      setIsConnected(true)
    }

    socketRef.current.onmessage = (event: MessageEvent) => {
      if (event.data instanceof ArrayBuffer) {
        console.log('📩 Получены бинарные данные', event.data.byteLength)

        // Создаем Blob из массива байтов
        const blob = new Blob([event.data], { type: 'image/jpeg' })

        // Создаем URL для изображения и обновляем src
        const imageUrl = URL.createObjectURL(blob)
        if (videoRef.current) {
          videoRef.current.src = imageUrl
        }
      }
    }

    socketRef.current.onclose = (event) => {
      console.log('❌ WebSocket закрыт', event)
      setIsConnected(false)
    }

    socketRef.current.onerror = (err) => {
      console.error('🚨 WebSocket ошибка:', err)
      setIsConnected(false)
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [])

  return (
    <div>
      <h1>📡 Live Video Stream</h1>
      <p>{isConnected ? '🟢 Подключено' : '🟠 Подключение...'}</p>
      <img ref={videoRef} alt='Video Stream' width='640' height='480' />
    </div>
  )
}

export default VideoStream
