import { useParams } from 'react-router';

import { fetchPhotoDetails } from '../../api';
import { useQuery } from '@tanstack/react-query';
import DownloadMenu from '../DownloadMenu/DownloadMenu';
import { LockClosedIcon } from '@heroicons/react/16/solid';
import ImageLoader from '../ImageLoader';

function usePhotoDetailsQuery({ id }: { id?: string }) {
  const { data, isLoading } = useQuery({
    enabled: !!id,
    queryKey: ['photo', id],
    queryFn: fetchPhotoDetails,
  });

  return {
    isLoading,
    photo: data,
  };
}

function formatDate(dateISO: string) {
  const date = new Date(dateISO);

  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedDate = formatter.format(date).replace(',', '');

  return formattedDate;
}

function PhotoDetails() {
  const params = useParams();
  const { photo, isLoading } = usePhotoDetailsQuery({ id: params.id });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
              <img
                className="w-6 h-6 rounded-full"
                src={photo?.user.profile_image.small}
                alt={photo?.user.name}
              />
              <span className="font-semibold">{photo?.user.name}</span>
            </div>
            {photo?.premium ? (
              <button className="bg-black text-white text-sm px-[28px] py-[10px] rounded-[4px] flex gap-1 items-center">
                <LockClosedIcon className="w-4 h-4" />
                <span>Premium</span>
              </button>
            ) : (
              <DownloadMenu
                photoHeight={photo?.height || 0}
                photoWidth={photo?.width || 0}
                downloadUrl={photo?.links.download_location}
              />
            )}
          </div>
          <div className="flex justify-center items-center mx-auto mb-8">
            <ImageLoader
              key={photo?.id}
              height={photo?.height || 0}
              width={photo?.width || 0}
              blurhash={photo?.blur_hash || ''}
              imageUrl={`${photo?.urls.thumb}&auto=format`}
              alt={photo?.alt_description || photo?.description || ''}
              srcSet={`
              ${photo?.urls.thumb}&auto=format 200w,
              ${photo?.urls.small}&auto=format 400w,
              ${photo?.urls.regular}&auto=format 1080w,
              ${photo?.urls.full}&auto=format ${photo?.width}w
            `}
              sizes="(max-width: 1080px) 100vw, 1080px"
              maxHeight={520}
            />
          </div>

          <h2 className="text-2xl font-semibold mb-6">
            {photo?.description || photo?.alt_description}
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-6">
            <div className="flex flex-col gap-2">
              <span className="text-neutral-600">Views</span>
              <span className="font-semibold text-neutral-900">
                {photo?.views?.toLocaleString('en-US')}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-neutral-600">Date</span>
              <span className="font-semibold text-neutral-900">
                {photo?.user.updated_at && formatDate(photo?.user.updated_at)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-neutral-600">Downloads</span>
              <span className="font-semibold text-neutral-900">
                {photo?.downloads?.toLocaleString('en-US')}
              </span>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            {photo?.tags?.map((tag) => {
              return (
                <span
                  key={tag.title}
                  className="text-neutral-600 bg-gray-50 px-2 py-1 rounded-[4px] text-xs"
                >
                  {tag.title}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoDetails;
