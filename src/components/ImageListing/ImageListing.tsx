import { UnsplashImage } from '../../types';

import MansoryLayout from '../MansoryLayout/MansoryLayout';
import { useImageListing } from './useImageListing';

function LoadingIndicator() {
  return <p>Loading...</p>;
}

function ErrorDisplay({ message }: { message: string }) {
  return <span>Error: {message}</span>;
}

function ImageListing() {
  const {
    ref,
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useImageListing();
  return (
    <>
      {status === 'pending' ? (
        <LoadingIndicator />
      ) : status === 'error' && error ? (
        <ErrorDisplay message={error.message} />
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
