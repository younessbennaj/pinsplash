import { UnsplashImage } from '../types';
import search from '../mocks/search.json';

export function fetchSearchPhotos(): Promise<UnsplashImage[]> {
  const photosWithUpdatedId = search.map((photo) => {
    return {
      ...photo,
      id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
    };
  });
  return new Promise((resolve) => {
    resolve(photosWithUpdatedId);
  });
}
