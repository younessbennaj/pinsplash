import { useInfiniteQuery } from '@tanstack/react-query';
import { UnsplashImage } from '../../types';
import photos from '../../mocks/photos.json';
import { useInfiniteScroll } from '../../queries/useInfiniteScroll';

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
    // to comment or delete
    staleTime: 1000 * 60 * 5,
  });
  const { ref } = useInfiniteScroll({ fetchNextPage });

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
