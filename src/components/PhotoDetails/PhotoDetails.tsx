import { useParams } from 'react-router';
import { DropdownMenu } from 'radix-ui';

import { fetchPhotoDetails } from '../../api';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useToast } from '../../hooks/useToast';

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

function DownloadMenu({ disabled = false }: { disabled?: boolean }) {
  const { createToast } = useToast();
  function handleDownload() {
    createToast({
      message: 'Your file is successfully downloaded.',
      variant: 'success',
    });
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={classNames(
            ' text-sm px-[28px] py-[10px] rounded-[4px] flex gap-1 items-center',
            {
              'cursor-not-allowed bg-neutral-100 text-neutral-400': disabled,
              'hover:cursor-pointer bg-indigo-700 hover:bg-indigo-800 text-white ':
                !disabled,
            },
          )}
        >
          Downloads <ChevronDownIcon className="w-4 h-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          align="end"
          className="shadow-md bg-white p-2 rounded-lg border border-neutral-200"
        >
          <DropdownMenu.Item
            className="p-2 cursor-pointer"
            onClick={handleDownload}
          >
            <span className="font-semibold">Small</span> (640 x 426)
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="p-2 cursor-pointer"
            onClick={handleDownload}
          >
            <span className="font-semibold">Medium</span> (1920 x 1080)
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="p-2 cursor-pointer"
            onClick={handleDownload}
          >
            <span className="font-semibold">Large</span> (2400 x 1600)
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function PhotoDetails() {
  const params = useParams();
  const { photo, isLoading } = usePhotoDetailsQuery({ id: params.id });

  console.log('photo', photo);

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
            <DownloadMenu />
          </div>
          <img
            className="w-full rounded-lg mb-8"
            src={photo?.urls.regular}
            alt={photo?.alt_description || ''}
          />
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
