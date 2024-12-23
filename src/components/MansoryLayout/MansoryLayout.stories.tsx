import type { Meta, StoryObj } from '@storybook/react';
import photos from '../../mocks/photos.json';

import MansoryLayout from './MansoryLayout';
import { UnsplashImage } from '../../types';

const meta: Meta<typeof MansoryLayout> = {
  component: () => {
    const photoList = photos as unknown as UnsplashImage[];
    return <MansoryLayout items={photoList as UnsplashImage[]} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
