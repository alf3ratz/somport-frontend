// App.tsx
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import VideoPlayer from './VideoStream';

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Video Stream</h1>
        <VideoPlayer />
    </div>
);
}

export default App;