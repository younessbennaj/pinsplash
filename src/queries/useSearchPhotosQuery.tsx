import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteScroll } from './useInfiniteScroll';
import { fetchSearchPhotos } from '../api';

export function useSearchPhotosQuery({ query }: { query: string }) {
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['photos', query],
    queryFn: fetchSearchPhotos,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
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
