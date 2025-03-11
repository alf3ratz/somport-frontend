// components/Tabs/Tabs.tsx
import React, { useState } from 'react'

import './tabs.css'

interface TabProps {
  label: string
  value: string
  active?: boolean
  onClick?: () => void
}

interface TabPanelProps {
  value: string
  children: React.ReactNode
}

interface TabsProps {
  children: React.ReactElement<TabProps | TabPanelProps>[]
  defaultActiveTab?: string
}

const Tabs: React.FC<TabsProps> & {
  Tab: React.FC<TabProps>
  TabPanel: React.FC<TabPanelProps>
} = ({ children, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || '')

  // Извлекаем вкладки и панели из children
  const tabs = React.Children.map(children, (child) =>
    child.type === Tabs.Tab || child.type === Tabs.TabPanel ? child : null,
  )

  // Если активная вкладка не задана, берем первую
  const firstTab = React.useMemo(() => {
    const first = tabs?.find((child) => child.type === Tabs.Tab)
    return first ? first.props.value : ''
  }, [tabs])

  const currentActiveTab = activeTab || firstTab

  return (
    <div className='vertical-tabs-container'>
      {/* Вертикальные кнопки */}
      <div className='vertical-tabs'>
        {React.Children.map(tabs, (child) => {
          if (child.type === Tabs.Tab) {
            return React.cloneElement(child, {
              active: child.props.value === currentActiveTab,
              onClick: () => setActiveTab(child.props.value),
            })
          }
          return null
        })}
      </div>

      {/* Содержимое активной вкладки */}
      <div className='tab-content'>
        {React.Children.map(tabs, (child) => {
          if (child.type === Tabs.TabPanel && child.props.value === currentActiveTab) {
            return child
          }
          return null
        })}
      </div>
    </div>
  )
}

// Компонент вкладки
const Tab: React.FC<TabProps> = ({ label, value, active, onClick }) => (
  <button
    className={`vertical-tab-button ${active ? 'active' : ''}`}
    onClick={onClick}
    role='tab'
    aria-selected={active}
    tabIndex={active ? 0 : -1}
  >
    {label}
  </button>
)

// Компонент содержимого вкладки
const TabPanel: React.FC<TabPanelProps> = ({ value, children }) => (
  <div className='tab-panel' role='tabpanel' hidden={!value}>
    {children}
  </div>
)

Tabs.Tab = Tab
Tabs.TabPanel = TabPanel

export default Tabs
