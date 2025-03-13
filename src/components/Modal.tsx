// components/Modal.tsx
import React from 'react'
import styled from 'styled-components'

import FeedConfigService, { FeedConfigResponse } from '../services/FeedConfigService'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`

const ModalBody = styled.div`
  margin-bottom: 20px;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const ModalButton = styled.button<{ variant?: string }>`
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${(props) => (props.variant === 'danger' ? '#dc3545' : '#007bff')};
  color: white;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;

  &:hover {
    background: ${(props) => (props.variant === 'danger' ? '#c82333' : '#0056b3')};
  }
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

interface ModalProps {
  open: boolean
  onClose: () => void
  config: FeedConfigResponse | null
  onSave: (config: FeedConfigResponse) => void
  onDelete: (config: FeedConfigResponse) => void
}

const Modal: React.FC<ModalProps> = ({ open, onClose, config, onSave, onDelete }) => {
  if (!open) return null

  const handleSave = () => {
    if (config) {
      onSave(config)
    }
    onClose()
  }

  const handleDelete = () => {
    if (config) {
      onDelete(config)
    }
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{config ? 'Редактировать Конфигурацию' : 'Создать Конфигурацию'}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <SliderContainer>
            <SliderLabel>Feed Count:</SliderLabel>
            <SliderInput
              type='range'
              min='1'
              max='100'
              value={config?.config.feedCount || 1}
              onChange={(e) => {
                if (config) {
                  const newFeedCount = parseInt(e.target.value, 10)
                  onSave({ ...config, config: { ...config.config, feedCount: newFeedCount } })
                }
              }}
              disabled={!config}
            />
            <span>{config?.config.feedCount || 1}</span>
          </SliderContainer>
          <div>
            <PoolButton
              active={config?.config.poolNumber === 1}
              onClick={() => {
                if (config) {
                  onSave({ ...config, config: { ...config.config, poolNumber: 1 } })
                }
              }}
              disabled={!config}
            >
              Бассейн 1
            </PoolButton>
            <PoolButton
              active={config?.config.poolNumber === 2}
              onClick={() => {
                if (config) {
                  onSave({ ...config, config: { ...config.config, poolNumber: 2 } })
                }
              }}
              disabled={!config}
            >
              Бассейн 2
            </PoolButton>
            <PoolButton
              active={config?.config.poolNumber === 3}
              onClick={() => {
                if (config) {
                  onSave({ ...config, config: { ...config.config, poolNumber: 3 } })
                }
              }}
              disabled={!config}
            >
              Бассейн 3
            </PoolButton>
            <PoolButton
              active={config?.config.poolNumber === 4}
              onClick={() => {
                if (config) {
                  onSave({ ...config, config: { ...config.config, poolNumber: 4 } })
                }
              }}
              disabled={!config}
            >
              Бассейн 4
            </PoolButton>
          </div>
        </ModalBody>
        <ModalFooter>
          {config && (
            <ModalButton variant='danger' onClick={handleDelete}>
              Удалить
            </ModalButton>
          )}
          <ModalButton onClick={handleSave}>{config ? 'Обновить' : 'Создать'}</ModalButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  )
}

export default Modal
