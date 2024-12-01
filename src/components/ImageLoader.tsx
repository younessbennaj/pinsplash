import { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';

function ImageLoader({
  alt,
  blurhash,
  imageUrl,
  width,
  height,
  srcSet,
  sizes,
}: {
  alt: string;
  blurhash: string;
  imageUrl: string;
  width: number;
  height: number;
  srcSet: string;
  sizes: string;
}) {
  const aspectRatio = width / height;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      setLoading(false);
    };

    image.src = imageUrl;
    image.srcset = srcSet;
    image.sizes = sizes;
  }, [imageUrl, sizes, srcSet]);
  return (
    <div
      style={{
        aspectRatio: `${aspectRatio}`,
        marginBottom: '16px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {loading ? (
        <Blurhash
          hash={blurhash}
          width="100%"
          height="100%"
          resolutionX={64}
          resolutionY={64}
          punch={1}
        />
      ) : (
        <img
          src={imageUrl}
          alt={alt || 'Image sans description'}
          srcSet={srcSet}
          sizes={sizes}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            display: 'block',
          }}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default ImageLoader;
