import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import SlideshowPage from './pages/SlideshowPage';
import MemoryGamePage from './pages/MemoryGamePage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/slideshow" element={<SlideshowPage />} />
      <Route path="/memory-game" element={<MemoryGamePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  );
}

export default App;
