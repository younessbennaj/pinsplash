import { useSearchParams } from 'react-router';

import { useSearchPhotosQuery } from '../../queries/useSearchPhotosQuery';
import MansoryLayout from '../MansoryLayout/MansoryLayout';
import { UnsplashImage } from '../../types';

import NextPageButton from '../NextPageButton/NextPageButton';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data, ref, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchPhotosQuery({ query: query || '' });

  return (
    <>
      {data ? (
        <MansoryLayout items={data.pages.flat() as UnsplashImage[]} />
      ) : null}
      <div ref={ref}>
        <NextPageButton
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
}

export default Search;
