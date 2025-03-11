import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import VideoConfigService from '../services/VideoConfigService'
import { videoStreamService } from '../services/VideoStreamService'

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100vh;
`

const StreamList = styled.div`
  width: 200px;
  border-right: 1px solid #ddd;
  padding-right: 20px;
`

const StreamItem = styled.div<{ active: boolean }>`
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 8px;
  background: ${(props) => (props.active ? '#f0f0f0' : 'transparent')};
  transition: background 0.3s;

  &:hover {
    background: #f8f8f8;
  }
`

const Content = styled.div`
  flex: 1;
`

const VideoStream: React.FC = () => {
  const [streams, setStreams] = useState<string[]>([])
  const [currentStream, setCurrentStream] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  useEffect(() => {
    const loadStreams = async () => {
      try {
        const config = await VideoConfigService.getStreamConfig()
        setStreams(config.videoStreamList)

        if (config.videoStreamList.includes('stream_1')) {
          setCurrentStream('stream_1')
        } else if (config.videoStreamList.length > 0) {
          setCurrentStream(config.videoStreamList[0])
        }
      } catch (error) {
        console.error('Ошибка загрузки конфигурации:', error)
      }
    }

    loadStreams()
  }, [])

  useEffect(() => {
    if (!currentStream) return

    // Подписка на статус соединения
    const statusSub = videoStreamService.connectionStatus$.subscribe(setIsConnected)
    // Подписка на изображения
    const imageSub = videoStreamService.imageSource$.subscribe(setCurrentImage)

    // Подключаемся к текущему потоку
    videoStreamService.connect(currentStream)

    return () => {
      statusSub.unsubscribe()
      imageSub.unsubscribe()
      videoStreamService.disconnect()
    }
  }, [currentStream])

  useEffect(() => {
    if (!currentStream) return
    videoStreamService.connect(currentStream)
  }, [currentStream])

  if (!currentStream) {
    return <div>Нет доступных потоков</div>
  }

  return (
    <Container>
      <StreamList>
        {streams.map((stream) => (
          <StreamItem key={stream} active={stream === currentStream} onClick={() => setCurrentStream(stream)}>
            {stream.replace('_', ' ').toUpperCase()}
          </StreamItem>
        ))}
      </StreamList>

      <Content>
        <h1>📡 Live Video Stream - {currentStream}</h1>
        <p>{isConnected ? '🟢 Connected' : '🟠 Connecting...'}</p>
        {currentImage && <img src={currentImage} alt='Video Stream' width='640' height='480' />}
      </Content>
    </Container>
  )
}

export default VideoStream
