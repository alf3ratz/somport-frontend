import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import FeedConfigService, { FeedConfigResponse } from '../services/FeedConfigService'

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100vh;
`

const Sidebar = styled.div`
  width: 250px;
  border-right: 1px solid #ddd;
  padding-right: 20px;
`

const StreamList = styled.div`
  flex: 1;
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
  flex: 2;
`

const SliderContainer = styled.div`
  margin-bottom: 20px;
`

const SliderLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`

const SliderInput = styled.input`
  width: 100%;
`

const PoolButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${(props) => (props.active ? '#007bff' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;

  &:hover {
    background: ${(props) => (props.active ? '#0056b3' : '#f8f8f8')};
  }
`

const UpdateButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${(props) => (props.active ? '#007bff' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;

  &:hover {
    background: ${(props) => (props.active ? '#0056b3' : '#f8f8f8')};
  }
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

  const handleConfigChange = (config: FeedConfigResponse) => {
    setCurrentConfig(config)
  }

  const handleFeedCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentConfig) {
      const newFeedCount = parseInt(event.target.value, 10)
      setCurrentConfig({ ...currentConfig, config: { ...currentConfig.config, feedCount: newFeedCount } })
    }
  }

  const handlePoolNumberClick = (poolNumber: number) => {
    if (currentConfig) {
      setCurrentConfig({ ...currentConfig, config: { ...currentConfig.config, poolNumber } })
    }
  }

  const handleUpdateClick = () => {
    if (!currentConfig) {
      alert('Конфигурация не выбрана')
      return
    }
    const updateConfig = async () => {
      try {
        console.log(`config: ${JSON.stringify({ currentConfig })}`)
        const updatedConfig = await FeedConfigService.updateConfig(currentConfig.id, currentConfig)
        console.log(`updated config: ${JSON.stringify({ updatedConfig })}`)
        console.log(`configs: ${JSON.stringify({ configs })}`)
        // Обновляем конфигурацию в списке
        setConfigs(
          (prevConfigs) =>
            prevConfigs.map((config) =>
              config.id === updatedConfig.id ? updatedConfig : config,
            ) as FeedConfigResponse[],
        )
        setCurrentConfig(updatedConfig) // Устанавливаем обновлённую конфигурацию
      } catch (error) {
        console.error('Ошибка обновления конфигурации:', error)
      }
    }
    updateConfig()
  }

  return (
    <Container>
      <Sidebar>
        <SliderContainer>
          <SliderLabel>Feed Count:</SliderLabel>
          <SliderInput
            type='range'
            min='1'
            max='100'
            value={currentConfig?.config.feedCount || 1}
            onChange={handleFeedCountChange}
            disabled={!currentConfig}
          />
          <span>{currentConfig?.config.feedCount || 1}</span>
        </SliderContainer>
        <div>
          <PoolButton
            active={currentConfig?.config.poolNumber === 1}
            onClick={() => handlePoolNumberClick(1)}
            disabled={!currentConfig}
          >
            Бассейн 1
          </PoolButton>
          <PoolButton
            active={currentConfig?.config.poolNumber === 2}
            onClick={() => handlePoolNumberClick(2)}
            disabled={!currentConfig}
          >
            Бассейн 2
          </PoolButton>
          <PoolButton
            active={currentConfig?.config.poolNumber === 3}
            onClick={() => handlePoolNumberClick(3)}
            disabled={!currentConfig}
          >
            Бассейн 3
          </PoolButton>
          <PoolButton
            active={currentConfig?.config.poolNumber === 4}
            onClick={() => handlePoolNumberClick(4)}
            disabled={!currentConfig}
          >
            Бассейн 4
          </PoolButton>
        </div>
      </Sidebar>
      <StreamList>
        {configs.map((config) => (
          <StreamItem
            key={config.id}
            active={config.id === currentConfig?.id}
            onClick={() => handleConfigChange(config)}
          >
            {`{\n id: ${config.id}, \n feedCount: ${config.config.feedCount} \n poolNumber: ${config.config.poolNumber}}`}
          </StreamItem>
        ))}
      </StreamList>
      <Content>
        {currentConfig && (
          <div>
            <p>{'{'}</p>
            <p>id: {currentConfig.id}</p>
            <p>feedCount: {currentConfig.config.feedCount}</p>
            <p>poolNumber: {currentConfig.config.poolNumber}</p>
            <p>{'}'}</p>
          </div>
        )}
      </Content>
      <div>
        <UpdateButton active={!!currentConfig} onClick={handleUpdateClick} disabled={!currentConfig}>
          Обновить
        </UpdateButton>
      </div>
    </Container>
  )
}

export default FeedConfigPage
