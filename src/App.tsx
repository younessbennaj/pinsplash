// import src/mocks/photos.json
import { useEffect, useState } from 'react';
import photos from './mocks/photos.json';

// mock fetching using photos.json with promise and async/await
function fetchPhotos() {
  return new Promise((resolve) => {
    resolve(photos);
  });
}

type UnsplashImage = {
  id: string;
  slug: string;
  alternative_slugs: {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
  };
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  promoted_at: string | null; // ISO date string or null
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  breadcrumbs: string[];
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[]; // assuming array of strings for collection IDs
  sponsorship: null | Record<string, unknown>; // null or a sponsorship object (unspecified here)
  topic_submissions: Record<string, { status: string; approved_on?: string }>; // key-value pairs of topic details
  asset_type: 'photo' | string; // assuming "photo" is one type, extendable
  premium: boolean;
  plus: boolean;
  user: {
    id: string;
    updated_at: string; // ISO date string
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string | null;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: string | null;
    };
  };
};

function App() {
  const [photoList, setPhotoList] = useState<UnsplashImage[]>([]);

  useEffect(() => {
    fetchPhotos().then((data) => {
      const photos = data;
      setPhotoList(photos as UnsplashImage[]); // Store the fetched photos in state
    });
  }, []);

  // Split images into three columns
  const columns = [[], [], []] as UnsplashImage[][];
  photoList.forEach((photo, index) => {
    columns[index % 3].push(photo);
  });

  return (
    <div>
      <h1>Pinsplash</h1>
      <div style={{ display: 'flex', gap: '16px' }}>
        {columns.map((column, colIndex) => (
          <div key={colIndex} style={{ flex: 1 }}>
            {column.map((photo) => (
              <div
                key={photo.id}
                style={{
                  marginBottom: '16px',
                }}
              >
                <img
                  fetchPriority="high"
                  src={photo.urls.thumb}
                  alt={photo.alt_description || 'Image sans description'}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
