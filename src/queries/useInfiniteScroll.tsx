import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function useInfiniteScroll({
  fetchNextPage,
}: {
  fetchNextPage: () => void;
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return {
    ref,
  };
}
