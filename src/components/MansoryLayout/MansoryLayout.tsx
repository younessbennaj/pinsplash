import { useMediaQuery } from '@uidotdev/usehooks';
import { UnsplashImage } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import ImageLoader from '../ImageLoader';

function categorizeByRatio(width: number, height: number) {
  const ratio = width / height;
  if (ratio < 0.8) {
    return 9 / 16; // Return numeric ratio for '9 / 16'
  } else if (ratio > 1.3) {
    return 4 / 3; // Return numeric ratio for '4 / 3'
  } else {
    return 1 / 1; // Return numeric ratio for '1 / 1'
  }
}

function MansoryLayout({ items }: { items: UnsplashImage[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(0); // Track max height

  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');
  const numColumns = isMobileOrTablet ? 2 : 3;

  // Configuration
  const columns = numColumns; // Number of columns
  const gap = 16; // Space between columns

  // Calculate column width
  const totalGap = (columns - 1) * gap; // Total space for gaps
  const columnWidth = (containerWidth - totalGap) / columns; // Final width of each column

  // Track the heights of each column
  const columnHeights = Array(columns).fill(0); // Initial heights of all columns

  const calculatePosition = (originalWidth: number, originalHeight: number) => {
    // Calculate height based on the aspect ratio
    const height =
      columnWidth / categorizeByRatio(originalWidth, originalHeight);

    // Find the column with the shortest height
    const shortestColumnIndex = columnHeights.indexOf(
      Math.min(...columnHeights),
    );

    // Position the item in the shortest column
    const top = columnHeights[shortestColumnIndex]; // Current height of the shortest column
    const left = shortestColumnIndex * (columnWidth + gap); // Horizontal position

    // Update the height of the column
    columnHeights[shortestColumnIndex] += height + gap;

    // Return the calculated positions
    return { top, left };
  };

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    const throttledUpdateContainerWidth = throttle(updateContainerWidth, 500);

    window.addEventListener('resize', throttledUpdateContainerWidth);

    updateContainerWidth();

    return () => {
      window.removeEventListener('resize', throttledUpdateContainerWidth);
      throttledUpdateContainerWidth.cancel();
    };
  }, []);

  useEffect(() => {
    // Update the maxHeight whenever items or containerWidth changes
    const heights = Array(columns).fill(0);

    items.forEach((item) => {
      const height = columnWidth / categorizeByRatio(item.width, item.height);
      const shortestColumnIndex = heights.indexOf(Math.min(...heights));
      heights[shortestColumnIndex] += height + gap;
    });

    setMaxHeight(Math.max(...heights));
  }, [items, columnWidth, gap, columns]);

  return (
    <div
      className="relative"
      ref={containerRef}
      style={{ height: maxHeight }} // Apply the calculated max height
    >
      {items.map((item) => {
        const position = calculatePosition(item.width, item.height);
        return (
          <div
            className="absolute item"
            key={item.id}
            tabIndex={1}
            style={{
              ...position,
              width: columnWidth,
            }}
          >
            <ImageLoader
              aspectRatio={categorizeByRatio(item.width, item.height)}
              key={item.id}
              height={item.height}
              width={item.width}
              blurhash={item.blur_hash}
              imageUrl={`${item.urls.thumb}&auto=format`}
              alt={item.alt_description || item.description || ''}
              srcSet={`
                    ${item.urls.thumb}&auto=format 200w,
                    ${item.urls.small}&auto=format 400w,
                    ${item.urls.regular}&auto=format 1080w,
                    ${item.urls.full}&auto=format ${item.width}w
                  `}
              sizes="(max-width: 600px) 200px, (max-width: 1024px) calc((100vw - 48px) / 2), calc((100vw - 64px) / 3)"
            />
          </div>
        );
      })}
    </div>
  );
}

export default MansoryLayout;
