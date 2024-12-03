import type { Meta, StoryObj } from '@storybook/react';
import photos from '../../mocks/photos.json';

import MasonryLayout from './MasonryLayout';
import { UnsplashImage } from '../../types';
import ImageLoader from '../ImageLoader';

const meta: Meta<typeof MasonryLayout> = {
  component: () => {
    const photoList = photos as unknown as UnsplashImage[];
    return (
      <MasonryLayout<UnsplashImage>
        items={photoList as UnsplashImage[]}
        renderItems={(item: UnsplashImage) => {
          return (
            <ImageLoader
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
          );
        }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
