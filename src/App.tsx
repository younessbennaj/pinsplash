import { UnsplashImage } from './types';
import photos from './mocks/photos.json';
import MansoryLayoutWithAbsolute from './components/MansoryLayout/MansoryLayout';
import { useQuery } from '@tanstack/react-query';

function fetchPhotos() {
  return new Promise((resolve) => {
    resolve(photos);
  });
}

function App() {
  const { data: photoList, isLoading } = useQuery({
    queryKey: ['photos'],
    queryFn: fetchPhotos as () => Promise<UnsplashImage[]>,
  });

  return (
    <div>
      <h1>Pinsplash</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : photoList ? (
        <MansoryLayoutWithAbsolute items={photoList} />
      ) : null}
    </div>
  );
}

export default App;
