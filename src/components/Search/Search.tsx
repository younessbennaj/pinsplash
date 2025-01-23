import { useSearchParams } from 'react-router';

import { useSearchPhotosQuery } from '../../queries/useSearchPhotosQuery';
import MansoryLayout from '../MansoryLayout/MansoryLayout';
import { UnsplashImage } from '../../types';
import SearchForm from '../SearchForm/SearchForm';
import NextPageButton from '../NextPageButton/NextPageButton';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data, ref, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchPhotosQuery({ query: query || '' });

  return (
    <div>
      <h1>Search</h1>
      <p>
        You searched for <i>{searchParams.get('q')}</i>
      </p>
      <SearchForm />
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
    </div>
  );
}

export default Search;
