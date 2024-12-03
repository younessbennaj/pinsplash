import { useMediaQuery } from '@uidotdev/usehooks';

function MasonryLayout<T>({
  items,
  renderItems,
}: {
  items: T[];
  renderItems: (item: T) => JSX.Element;
}) {
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  const numColumns = isMobileOrTablet ? 2 : 3;

  const columns = Array.from({ length: numColumns }, () => []) as T[][];
  items.forEach((photo, index) => {
    columns[index % numColumns].push(photo);
  });

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {columns.map((column, colIndex) => (
        <div key={colIndex} style={{ flex: 1 }}>
          {column.map((photo) => renderItems(photo))}
        </div>
      ))}
    </div>
  );
}

export default MasonryLayout;
