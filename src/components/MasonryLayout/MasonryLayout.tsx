import { useMediaQuery } from '@uidotdev/usehooks';
import { UnsplashImage } from '../../types';
import ImageLoader from '../ImageLoader';

function categorizeByRatio(width: number, height: number) {
  const ratio = width / height;
  if (ratio < 0.8) {
    return '9 / 16';
  } else if (ratio > 1.3) {
    return '4 / 3';
  } else {
    return '1 / 1';
  }
}

const ratioHeights = {
  '9 / 16': 710,
  '1 / 1': 400,
  '4 / 3': 300,
};

const GAP = 16;

function MasonryLayout({
  items,
  //   renderItems,
}: {
  items: UnsplashImage[];
  //   renderItems: (item: UnsplashImage) => JSX.Element;
}) {
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  const numColumns = isMobileOrTablet ? 2 : 3;

  const columns = Array.from(
    { length: numColumns },
    () => [],
  ) as UnsplashImage[][];
  const columnHeights = Array(numColumns).fill(0);

  items.forEach((photo) => {
    const category = categorizeByRatio(photo.width, photo.height);

    const targetColumn = columnHeights.indexOf(Math.min(...columnHeights));

    columns[targetColumn].push({
      ...photo,
    });

    columnHeights[targetColumn] += ratioHeights[category] + GAP;
  });

  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {columns.map((column, colIndex) => (
        <div key={colIndex} style={{ flex: 1 }}>
          {column.map((photo) => {
            return (
              <ImageLoader
                aspectRatio={categorizeByRatio(photo.width, photo.height)}
                key={photo.id}
                height={photo.height}
                width={photo.width}
                blurhash={photo.blur_hash}
                imageUrl={`${photo.urls.thumb}&auto=format`}
                alt={photo.alt_description || photo.description || ''}
                srcSet={`
                    ${photo.urls.thumb}&auto=format 200w,
                    ${photo.urls.small}&auto=format 400w,
                    ${photo.urls.regular}&auto=format 1080w,
                    ${photo.urls.full}&auto=format ${photo.width}w
                  `}
                sizes="(max-width: 600px) 200px, (max-width: 1024px) calc((100vw - 48px) / 2), calc((100vw - 64px) / 3)"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default MasonryLayout;
