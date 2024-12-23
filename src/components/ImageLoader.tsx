import { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';

function ImageLoader({
  aspectRatio,
  alt,
  blurhash,
  imageUrl,
  width,
  height,
  srcSet,
  sizes,
}: {
  aspectRatio?: number;
  alt: string;
  blurhash: string;
  imageUrl: string;
  width: number;
  height: number;
  srcSet: string;
  sizes: string;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      setLoaded(true);
    };

    image.src = imageUrl;
    image.srcset = srcSet;
    image.sizes = sizes;
  }, [imageUrl, sizes, srcSet]);

  return (
    <div
      style={{
        backgroundColor: '#948cf988',
        position: 'relative',
        aspectRatio: `${aspectRatio ? aspectRatio : width / height}`,
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Blurhash */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Blurhash
          hash={blurhash}
          width="100%"
          height="100%"
          resolutionX={64}
          resolutionY={64}
          punch={1}
        />
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt={alt || 'Image sans description'}
        srcSet={srcSet}
        sizes={sizes}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
        loading="lazy"
      />
    </div>
  );
}

export default ImageLoader;
