import { useInfiniteQuery } from '@tanstack/react-query';
import { UnsplashImage } from '../../types';
import photos from '../../mocks/photos.json';
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

export function useImageListing() {
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
  return {
    ref,
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
