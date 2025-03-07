import React, { useEffect, useRef, useState } from 'react'

const VideoStream: React.FC = () => {
  const [currentStream, setCurrentStream] = useState<'stream_1' | 'stream_2'>('stream_1')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const videoRef = useRef<HTMLImageElement | null>(null)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Закрываем предыдущее соединение
    if (socketRef.current) {
      socketRef.current.close()
    }

    console.log(`🔄 Подключение к ${currentStream}...`)
    const wsUrl = `ws://localhost:8080/video-stream/${currentStream}`
    const socket = new WebSocket(wsUrl)
    socketRef.current = socket

    socket.binaryType = 'arraybuffer'

    socket.onopen = () => {
      console.log(`✅ Подключено к ${currentStream}`)
      setIsConnected(true)
    }

    socket.onmessage = (event: MessageEvent) => {
      if (event.data instanceof ArrayBuffer) {
        const blob = new Blob([event.data], { type: 'image/jpeg' })
        const imageUrl = URL.createObjectURL(blob)
        if (videoRef.current) {
          videoRef.current.src = imageUrl
        }
      }
    }

    socket.onclose = (event) => {
      console.log(`❌ Соединение с ${currentStream} закрыто`, event)
      setIsConnected(false)
    }

    socket.onerror = (err) => {
      console.error(`🚨 Ошибка в ${currentStream}:`, err)
      setIsConnected(false)
    }

    return () => {
      socket.close()
    }
  }, [currentStream])

  const handleStreamSelect = (stream: 'stream_1' | 'stream_2') => {
    setCurrentStream(stream)
  }

  return (
    <div>
      <div>
        <button
          onClick={() => handleStreamSelect('stream_1')}
          style={{
            backgroundColor: currentStream === 'stream_1' ? '#4CAF50' : '#ddd',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Stream 1
        </button>
        <button
          onClick={() => handleStreamSelect('stream_2')}
          style={{
            backgroundColor: currentStream === 'stream_2' ? '#4CAF50' : '#ddd',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Stream 2
        </button>
      </div>

      <h1>📡 Live Video Stream - {currentStream}</h1>
      <p>{isConnected ? '🟢 Подключено' : '🟠 Подключение...'}</p>
      <img ref={videoRef} alt='Video Stream' width='640' height='480' />
    </div>
  )
}

export default VideoStream
