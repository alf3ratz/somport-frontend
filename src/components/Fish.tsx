// Fish.tsx // Путь к JSON анимации
import Lottie from 'lottie-react'
import React, { useEffect, useState } from 'react'

import animationData from './lottie-animation.json'

import './fish.css'

interface FishProps {
  color: string
}

const Fish: React.FC<FishProps> = ({ color }) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })

  useEffect(() => {
    // Функция для генерации случайных позиций
    const generateRandomPosition = () => {
      const randomTop = Math.random() * 90 // Случайная позиция по вертикали от 0% до 90% высоты
      const randomLeft = Math.random() * 100 // Случайная позиция по горизонтали от 0% до 100% ширины
      setPosition({ top: randomTop, left: randomLeft })
    }

    generateRandomPosition()
    const interval = setInterval(generateRandomPosition, 3000) // Каждые 3 секунды обновляем позицию

    return () => clearInterval(interval) // Очистка интервала при удалении компонента
  }, [])

  return (
    // <div
    //   className='fish'
    //   style={{
    //     backgroundColor: color,
    //     top: `${position.top}%`, // Преобразуем в проценты
    //     left: `${position.left}%`, // Преобразуем в проценты
    //   }}
    // ></div>
    <div
      className='absolute justify-center items-center min-h-screen bg-gray-200'
      // style={{
      //   backgroundColor: color,
      //   top: `${position.top}%`, // Преобразуем в проценты
      //   left: `${position.left}%`, // Преобразуем в проценты
      // }}
    >
      <Lottie
        animationData={animationData} // Данные анимации из JSON
        loop={true}
        autoplay={true}
        renderer='svg'
        style={{
          width: '50px',
          height: '50px',
          top: `${position.top}%`, // Преобразуем в проценты
          left: `${position.left}%`,
        }}
      />
    </div>
  )
}

export default Fish
