import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { UnsplashImage } from '../../types';
import photos from '../../mocks/photos.json';
import { useEffect } from 'react';
import MansoryLayout from '../MansoryLayout/MansoryLayout';

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

function ImageListing() {
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
    <>
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : data ? (
        <MansoryLayout items={data.pages.flat() as UnsplashImage[]} />
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
    </>
  );
}

export default ImageListing;
