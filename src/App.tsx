import { useEffect, useState } from 'react';
import photos from './mocks/photos.json';
import { UnsplashImage } from './types';
import MansoryLayout from './components/MasonryLayout/MasonryLayout.tsx';
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

  return (
    <div>
      <h1>Pinsplash</h1>
      <MansoryLayout<UnsplashImage>
        items={photoList}
        renderItems={(item) => {
          return (
            <ImageLoader
              key={item.id}
              height={item.height}
              width={item.width}
              blurhash={item.blur_hash}
              imageUrl={`${item.urls.thumb}&auto=format`}
              alt={item.alt_description || item.description || ''}
              srcSet={`
            ${item.urls.thumb}&auto=format 200w,
            ${item.urls.small}&auto=format 400w,
            ${item.urls.regular}&auto=format 1080w,
            ${item.urls.full}&auto=format ${item.width}w
          `}
              sizes="(max-width: 600px) 200px, (max-width: 1024px) calc((100vw - 48px) / 2), calc((100vw - 64px) / 3)"
            />
          );
        }}
      />
    </div>
  );
}

export default App;
