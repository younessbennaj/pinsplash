import type { Meta, StoryObj } from '@storybook/react';
import photos from '../../mocks/photos.json';

import Card from './Card';
import { UnsplashImage } from '../../types';

const meta: Meta<typeof Card> = {
  component: ({ aspectRatio }) => {
    const photoList = photos as unknown as UnsplashImage[];
    return (
      <div className="w-1/3">
        <Card item={photoList[1] as UnsplashImage} aspectRatio={aspectRatio} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    aspectRatio: 4 / 3,
  },
  name: '4 : 3',
};

export const Square: Story = {
  args: {
    aspectRatio: 1 / 1,
  },
  name: '1 : 1',
};

export const Portrait: Story = {
  args: {
    aspectRatio: 9 / 16,
  },
  name: '9 : 16',
};
