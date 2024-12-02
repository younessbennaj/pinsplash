import { useEffect, useState } from 'react';
import photos from './mocks/photos.json';
import { UnsplashImage } from './types';
import ImageLoader from './components/ImageLoader.tsx';
import { useMediaQuery } from '@uidotdev/usehooks';

function fetchPhotos() {
  return new Promise((resolve) => {
    resolve(photos);
  });
}

function App() {
  const [photoList, setPhotoList] = useState<UnsplashImage[]>([]);

  // Détection des tailles d'écran
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  // Nombre de colonnes dynamiques
  const numColumns = isMobileOrTablet ? 2 : 3;

  useEffect(() => {
    fetchPhotos().then((data) => {
      const photos = data;
      setPhotoList(photos as UnsplashImage[]);
    });
  }, []);

  // Split images into columns dynamiquement
  const columns = Array.from(
    { length: numColumns },
    () => [],
  ) as UnsplashImage[][];
  photoList.forEach((photo, index) => {
    columns[index % numColumns].push(photo);
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
                  imageUrl={`${photo.urls.thumb}&auto=format`}
                  alt={photo.alt_description || photo.description || ''}
                  srcSet={`
                  ${photo.urls.thumb}&auto=format 200w,
                  ${photo.urls.small}&auto=format 400w,
                  ${photo.urls.regular}&auto=format 1080w,
                  ${photo.urls.full}&auto=format ${photo.width}w
                `}
                  sizes="(max-width: 600px) 200px, (max-width: 1024px) calc((100vw - 48px) / 2), calc((100vw - 64px) / 3)"
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
