import type { Meta, StoryObj } from '@storybook/react';
import photos from '../../mocks/photos.json';

import MasonryLayout from './MasonryLayout';
import { UnsplashImage } from '../../types';

const meta: Meta<typeof MasonryLayout> = {
  component: () => {
    const photoList = photos as unknown as UnsplashImage[];
    return (
      <MasonryLayout<UnsplashImage>
        items={photoList as UnsplashImage[]}
        renderItems={(item: UnsplashImage) => {
          return (
            <img
              src={item.urls.thumb}
              alt={item.alt_description || item.description || ''}
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
