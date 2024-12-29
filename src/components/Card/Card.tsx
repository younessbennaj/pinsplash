import { UnsplashImage } from '../../types';
import ImageLoader from '../ImageLoader';

function Card({
  aspectRatio,
  item,
}: {
  aspectRatio: number;
  item: UnsplashImage;
}) {
  return (
    <div>
      <ImageLoader
        aspectRatio={aspectRatio}
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
}

export default Card;
