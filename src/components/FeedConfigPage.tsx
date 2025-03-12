import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import FeedConfigService, { FeedConfigResponse } from '../services/FeedConfigService'

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

const FeedConfigPage: React.FC = () => {
  const [configs, setConfigs] = useState<FeedConfigResponse[]>([])
  const [currentConfig, setCurrentConfig] = useState<FeedConfigResponse | null>(null)

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const configs = await FeedConfigService.getAllConfigs()
        setConfigs(configs)
      } catch (error) {
        console.error('Ошибка загрузки конфигураций:', error)
      }
    }

    fetchConfigs()
  }, [])

  return (
    <Container>
      <StreamList>
        {configs.map((config) => (
          <StreamItem key={config.id} active={config.id === currentConfig?.id} onClick={() => setCurrentConfig(config)}>
            {`{\n id: ${config.id}, \n feedCount: ${config.config.feedCount} \n poolNumber: ${config.config.poolNumber}`}
          </StreamItem>
        ))}
      </StreamList>
      <Content>{currentConfig && <div>Выбран поток с ID: {currentConfig.id}</div>}</Content>
    </Container>
  )
}

export default FeedConfigPage
