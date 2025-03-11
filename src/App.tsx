// App.tsx
import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import VideoStream from './components/VideoStream';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

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
                alignItems: 'center', // Центрирование по горизонтали
                minHeight: '100vh', // Полная высота экрана
                padding: '20px',
                boxSizing: 'border-box',
              }}
            >
              <h1 style={{ textAlign: 'center' }}>Пример вертикальных табов с Material-UI</h1>

              {/* Вертикальный таб-бар */}
              <Box
                sx={{
                  display: 'flex',
                  height: 'calc(100vh - 100px)', // Высота минус заголовок
                  width: '100%',
                  maxWidth: '1200px', // Максимальная ширина для адаптивности
                  marginTop: '20px',
                }}
              >
                {/* Левая панель с кнопками (закрепленная) */}
                <Box
                  sx={{
                    position: 'sticky', // Закрепляем панель при прокрутке
                    top: '20px', // Отступ сверху
                    alignSelf: 'flex-start', // Выравниваем по верху
                    width: '150px',
                    borderRight: 1,
                    borderColor: 'divider',
                    zIndex: 1000,
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
                    <Tab label="Вкладка 1" />
                    <Tab label="Вкладка 2" />
                    <Tab label="Вкладка 3" />
                  </Tabs>
                </Box>

                {/* Правая панель с содержимым */}
                <Box
                  sx={{
                    flexGrow: 1,
                    marginLeft: '20px', // Отступ между табами и содержимым
                    padding: '20px',
                    border: '1px solid #eee',
                    borderRadius: '4px',
                    overflowY: 'auto', // Прокрутка содержимого
                    maxHeight: 'calc(100vh - 140px)', // Ограничение высоты
                  }}
                >
                  {activeTab === 0 && (
                    <Typography>
                      <h2>Содержимое 1</h2>
                      <p>Это содержимое первой вкладки.</p>
                      <AuthPage />
                    </Typography>
                  )}
                  {activeTab === 1 && (
                    <Typography>
                      <h2>Содержимое 2</h2>
                      <p>Это содержимое второй вкладки.</p>
                      <Dashboard />
                    </Typography>
                  )}
                  {activeTab === 2 && (
                    <Typography>
                      <h2>Содержимое 3</h2>
                      <p>Это содержимое третьей вкладки.</p>
                      <VideoStream />
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