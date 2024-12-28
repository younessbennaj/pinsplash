import { UnsplashImage } from './types';
import photos from './mocks/photos.json';
import MansoryLayoutWithAbsolute from './components/MansoryLayout/MansoryLayout';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

// Mock function to fetch photos
function fetchPhotos(): Promise<UnsplashImage[]> {
  const photosWithUpdatedId = photos.map((photo) => {
    return {
      ...photo,
      id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
    };
  });
  return new Promise((resolve) => {
    resolve(photosWithUpdatedId);
  });
}

function App() {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: fetchPhotos,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      <h1>Pinsplash</h1>
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : data ? (
        <MansoryLayoutWithAbsolute
          items={data.pages.flat() as UnsplashImage[]}
        />
      ) : null}
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
}

export default App;
