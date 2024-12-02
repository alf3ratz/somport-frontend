import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className='home-page'>
      <h2>Добро пожаловать на главную страницу!</h2>
      <button onClick={() => alert('Вы нажали кнопку 1')}>Кнопка 1</button>
      <button onClick={() => alert('Вы нажали кнопку 2')}>Кнопка 2</button>
      <button onClick={() => alert('Вы нажали кнопку 3')}>Кнопка 3</button>
    </div>
  )
}

export default HomePage
