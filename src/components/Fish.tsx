// Fish.tsx // Путь к JSON анимации
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'

import animationData from './lottie-animation.json'

import './fish.css'

interface FishProps {
  color: string
}

const Fish: React.FC<FishProps> = ({ color }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: Math.random() * (windowSize.height - 150), // Изначальная случайная позиция
    left: Math.random() * (windowSize.width - 150), // Изначальная случайная позиция
  })

  useEffect(() => {
    // Функция для генерации случайных позиций
    const generateRandomPosition = () => {
      const randomTop = Math.random() * (windowSize.height - 150) // Случайная позиция по вертикали от 0% до 90% высоты
      const randomLeft = Math.random() * (windowSize.width - 150) // Случайная позиция по горизонтали от 0% до 100% ширины
      setPosition({ top: randomTop, left: randomLeft })
    }

    // Генерация случайной позиции каждый 3 секунды
    const interval = setInterval(generateRandomPosition, 3000)

    // Очистка интервала при удалении компонента
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className='relative'
      style={{
        top: `${position.top}px`, // Позиция по вертикали
        left: `${position.left}px`, // Позиция по горизонтали
        //transform: 'translate(-50%, -50%)', // Центрирование по X и Y для точности
        pointerEvents: 'none', // Чтобы рыбы не блокировали другие элементы на странице
      }}
    >
      <Lottie
        animationData={animationData} // Данные анимации из JSON
        loop={true}
        autoplay={true}
        renderer='svg'
        style={{
          width: '150px', // Размер анимации
          height: '150px', // Размер анимации
        }}
      />
    </div>
  )
}

export default Fish
