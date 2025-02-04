import { DropdownMenu } from 'radix-ui';
import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import classNames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

function DownloadMenu({
  downloadUrl,
  disabled = false,
  photoHeight,
  photoWidth,
}: {
  downloadUrl?: string;
  disabled?: boolean;
  photoHeight: number;
  photoWidth: number;
}) {
  const { createToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const calculateHeight = (targetWidth: number) => {
    const aspectRatio = photoHeight / photoWidth;
    return Math.round(targetWidth * aspectRatio);
  };

  async function handleDownload(size: number) {
    setIsDownloading(true);

    if (!downloadUrl) {
      createToast({
        message: 'Download link is unavailable.',
        variant: 'error',
      });
      setIsDownloading(false);
      return;
    }

    try {
      const response = await fetch(`${downloadUrl}&w=${size}`, {
        headers: {
          Authorization: `Client-ID tYj_8Cn_odIocP7S09mSRvkhS8D24EdMdsMJeVjP1Vw`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to track download (Status: ${response.status})`,
        );
      }

      const data = await response.json();

      const imageUrl = data.url;

      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(imageBlob);
      link.setAttribute('download', `unsplash-${Date.now()}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);

      createToast({
        message: 'Your file has been downloaded successfully!',
        variant: 'success',
      });
    } catch (error) {
      console.error('Download error:', error);
      createToast({
        message: 'Failed to download the image. Please try again later.',
        variant: 'error',
      });
    } finally {
      setIsDownloading(false);
    }
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild disabled={disabled || isDownloading}>
        <button
          className={classNames(
            ' text-sm px-[28px] py-[10px] rounded-[4px] flex gap-1 items-center',
            {
              'cursor-not-allowed bg-neutral-100 text-neutral-400': disabled,
              'hover:cursor-pointer bg-indigo-700 hover:bg-indigo-800 text-white ':
                !disabled,
              'cursor-not-allowed bg-indigo-500 hover:bg-indigo-500 text-white':
                isDownloading,
            },
          )}
          disabled={disabled || isDownloading}
        >
          {isDownloading ? (
            <>
              <svg
                className="mr-3 -ml-1 size-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Downloading...
            </>
          ) : (
            <>
              Downloads <ChevronDownIcon className="w-4 h-4" />
            </>
          )}
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
            onClick={() => handleDownload(640)}
          >
            <span className="font-semibold">Small</span> (640 x{' '}
            {calculateHeight(640)})
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="p-2 cursor-pointer"
            onClick={() => handleDownload(1920)}
          >
            <span className="font-semibold">Medium</span> (1920 x{' '}
            {calculateHeight(1920)})
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="p-2 cursor-pointer"
            onClick={() => handleDownload(2400)}
          >
            <span className="font-semibold">Large</span> (2400 x{' '}
            {calculateHeight(2400)})
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default DownloadMenu;
