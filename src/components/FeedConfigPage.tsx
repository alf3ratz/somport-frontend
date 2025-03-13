// components/FeedConfigPage.tsx
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Modal from './Modal'

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

const CreateButton = styled.button<{ active: boolean }>`
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
  const [creatingConfig, setCreatingConfig] = useState<FeedConfigResponse | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

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
    setCreatingConfig(null)
    setModalOpen(true)
  }

  const handleFeedCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentConfig) {
      const newFeedCount = parseInt(event.target.value, 10)
      setCurrentConfig({ ...currentConfig, config: { ...currentConfig.config, feedCount: newFeedCount } })
    } else if (creatingConfig) {
      const newFeedCount = parseInt(event.target.value, 10)
      setCreatingConfig({ ...creatingConfig, config: { ...creatingConfig.config, feedCount: newFeedCount } })
    }
  }

  const handlePoolNumberClick = (poolNumber: number) => {
    if (currentConfig) {
      setCurrentConfig({ ...currentConfig, config: { ...currentConfig.config, poolNumber } })
    } else if (creatingConfig) {
      setCreatingConfig({ ...creatingConfig, config: { ...creatingConfig.config, poolNumber } })
    }
  }

  const handleUpdateClick = () => {
    if (!currentConfig) {
      alert('Конфигурация не выбрана')
      return
    }
    const updateConfig = async () => {
      try {
        const updatedConfig = await FeedConfigService.updateConfig(currentConfig.id, currentConfig)
        // Обновляем конфигурацию в списке
        setConfigs((prevConfigs) =>
          prevConfigs.map((config) => (config.id === updatedConfig.id ? updatedConfig : config)),
        )
        setCurrentConfig(updatedConfig) // Устанавливаем обновлённую конфигурацию
        setModalOpen(false) // Закрываем модальное окно
      } catch (error) {
        console.error('Ошибка обновления конфигурации:', error)
      }
    }
    updateConfig()
  }

  const handleCreateClick = () => {
    const newConfig: FeedConfigResponse = {
      id: Date.now(), // Временный ID для нового конфига
      config: {
        feedCount: 1,
        poolNumber: 1,
      },
    }
    setCreatingConfig(newConfig)
    //setCurrentConfig(null)
    setModalOpen(true)
  }

  const handleSaveConfig = (config: FeedConfigResponse) => {
    if (creatingConfig) {
      // Создание новой конфигурации
      const createConfig = async () => {
        try {
          const createdConfig = await FeedConfigService.createConfig(creatingConfig)
          setConfigs((prevConfigs) => [...prevConfigs, createdConfig])
          setCurrentConfig(createdConfig)
          setCreatingConfig(null)
          setModalOpen(false)
        } catch (error) {
          console.error('Ошибка создания конфигурации:', error)
        }
      }
      createConfig()
    } else if (currentConfig) {
      // Обновление существующей конфигурации
      handleUpdateClick()
    }
  }

  const handleDeleteConfig = (config: FeedConfigResponse) => {
    const deleteConfig = async () => {
      try {
        await FeedConfigService.deleteConfig(config.id)
        setConfigs((prevConfigs) => prevConfigs.filter((c) => c.id !== config.id))
        setCurrentConfig(null)
        setModalOpen(false)
      } catch (error) {
        console.error('Ошибка удаления конфигурации:', error)
      }
    }
    deleteConfig()
  }

  return (
    <Container>
      <Sidebar>
        <CreateButton active={true} onClick={handleCreateClick}>
          Создать
        </CreateButton>
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
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        config={creatingConfig || currentConfig}
        onSave={handleSaveConfig}
        onDelete={handleDeleteConfig}
      />
    </Container>
  )
}

export default FeedConfigPage
