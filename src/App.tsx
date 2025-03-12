// App.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import VideoStream from './components/VideoStream';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import FeedConfigPage from './components/FeedConfigPage';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Обработчик переключения вкладок
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/tabs"
          element={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Полная высота экрана
                padding: '20px',
                boxSizing: 'border-box',
              }}
            >
              {/* Заголовок
              <Box
                sx={{
                  marginBottom: '20px', // Отступ под заголовком
                }}
              >
            
              </Box> */}

              {/* Контейнер для таб-бара и содержимого */}
              <Box
                sx={{
                  display: 'flex',
                  height: 'calc(100vh - 100px)', // Высота минус заголовок
                  width: '100%',
                  maxWidth: '1200px', // Максимальная ширина для адаптивности
                  margin: '0 auto', // Центрирование контейнера
                }}
              >
                {/* Левая панель с кнопками (закрепленная) */}
                <Box
                  sx={{
                    position: 'fixed', // Закрепляем панель
                    left: '20px', // Отступ слева
                    top: '120px', // Отступ сверху (высота заголовка + отступ)
                    bottom: '20px', // Отступ снизу
                    width: '150px',
                    borderRight: 1,
                    borderColor: 'divider',
                    zIndex: 1000,
                    overflowY: 'auto', // Прокрутка табов
                  }}
                >
                  <Tabs
                    orientation="vertical" // Вертикальное расположение
                    variant="scrollable" // Добавляем возможность прокрутки при большом количестве вкладок
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="Vertical tabs"
                    sx={{
                      minWidth: '150px', // Минимальная ширина кнопок
                    }}
                  >
                    <Tab label="Авторизация" />
                    <Tab label="Пользователи" />
                    <Tab label="Видео с камер" />
                    <Tab label="Настройка конфигураций" />
                  </Tabs>
                </Box>

                {/* Правая панель с содержимым */}
                <Box
                  sx={{
                    flexGrow: 1,
                    marginLeft: '10px', // Отступ между табами и содержимым (ширина таб-бара + отступ слева)
                    padding: '20px',
                    border: '1px solid #eee',
                    borderRadius: '4px',
                    overflowY: 'auto', // Прокрутка содержимого
                    maxHeight: 'calc(100vh - 160px)', // Ограничение высоты
                    width: '100%', // Ширина на всю доступную область
                  }}
                >
                  {activeTab === 0 && (
                    <Typography>
                      <AuthPage />
                    </Typography>
                  )}
                  {activeTab === 1 && (
                    <Typography>
                      <Dashboard />
                    </Typography>
                  )}
                  {activeTab === 2 && (
                    <Typography>
                      <VideoStream />
                    </Typography>
                  )}
                  {activeTab === 3 && (
                    <Typography>
                      <FeedConfigPage />
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;