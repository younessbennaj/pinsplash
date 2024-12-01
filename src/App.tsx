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
                  imageUrl={photo.urls.regular}
                  alt={photo.alt_description || photo.description || ''}
                  srcSet={`
                    ${photo.urls.thumb} 200w,
                    ${photo.urls.small} 400w,
                    ${photo.urls.regular} 1080w,
                    ${photo.urls.full} ${photo.width}w
                  `}
                  sizes="(max-width: 600px) calc((100vw - 48px) / 2), (max-width: 1024px) calc((100vw - 64px) / 3), calc((100vw - 64px) / 3)"
                />
                // <img
                //   src={photo.urls.thumb}
                //   srcSet={`
                //     ${photo.urls.thumb} 200w,
                //     ${photo.urls.small} 400w,
                //     ${photo.urls.regular} 1080w,
                //     ${photo.urls.full} ${photo.width}w
                //   `}
                //   sizes="(max-width: 600px) calc((100vw - 48px) / 2), (max-width: 1024px) calc((100vw - 64px) / 3), calc((100vw - 64px) / 3)"
                //   alt={photo.alt_description || 'Image sans description'}
                //   style={{
                //     width: '100%',
                //     height: 'auto',
                //     borderRadius: '8px',
                //     display: 'block',
                //   }}
                //   loading="lazy"
                //   onLoad={() => {
                //     console.log('Image loaded');
                //   }}
                // />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
