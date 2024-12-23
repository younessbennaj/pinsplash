import { useEffect, useState } from 'react';
import { UnsplashImage } from './types';
import photos from './mocks/photos.json';
import MansoryLayoutWithAbsolute from './components/MansoryLayout/MansoryLayout';

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
      <MansoryLayoutWithAbsolute items={photoList} />
    </div>
  );
}

export default App;
