import { useEffect, useState } from 'react';
import photos from './mocks/photos.json';
import { UnsplashImage } from './types';
import ImageLoader from './components/ImageLoader.tsx';

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

  // Split images into three columns
  const columns = [[], [], []] as UnsplashImage[][];
  photoList.forEach((photo, index) => {
    columns[index % 3].push(photo);
  });

  return (
    <div>
      <h1>Pinsplash</h1>
      <div style={{ display: 'flex', gap: '16px' }}>
        {columns.map((column, colIndex) => (
          <div key={colIndex} style={{ flex: 1 }}>
            {column.map((photo) => {
              return (
                <ImageLoader
                  key={photo.id}
                  height={photo.height}
                  width={photo.width}
                  blurhash={photo.blur_hash}
                  imageUrl={photo.urls.small}
                  alt={photo.alt_description || photo.description || ''}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
