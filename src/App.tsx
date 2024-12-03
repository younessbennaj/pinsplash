import { useEffect, useState } from 'react';
import photos from './mocks/photos.json';
import { UnsplashImage } from './types';
import MansoryLayout from './components/MasonryLayout/MasonryLayout.tsx';

function fetchPhotos() {
  return new Promise((resolve) => {
    resolve(photos);
  });
}

function App() {
  const [photoList, setPhotoList] = useState<UnsplashImage[]>([]);

  useEffect(() => {
    fetchPhotos().then((data) => {
      const photos = data;
      setPhotoList(photos as UnsplashImage[]);
    });
  }, []);

  return (
    <div>
      <h1>Pinsplash</h1>
      <MansoryLayout items={photoList} />
    </div>
  );
}

export default App;
