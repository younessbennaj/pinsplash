function NextPageButton({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  return (
    <button
      onClick={() => fetchNextPage()}
      disabled={!hasNextPage || isFetchingNextPage}
    >
      {isFetchingNextPage
        ? 'Loading more...'
        : hasNextPage
          ? 'Load Newer'
          : 'Nothing more to load'}
    </button>
  );
}

export default NextPageButton;
