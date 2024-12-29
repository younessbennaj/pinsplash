import * as Tooltip from '@radix-ui/react-tooltip';
import { UnsplashImage } from '../../types';
import ImageLoader from '../ImageLoader';
import { upperFirst } from 'lodash';

function Card({
  aspectRatio,
  item,
}: {
  aspectRatio: number;
  item: UnsplashImage;
}) {
  return (
    <div
      className="hover:cursor-pointer relative overflow-hidden rounded-lg group outline-none"
      tabIndex={1}
    >
      <ImageLoader
        aspectRatio={aspectRatio}
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
      <div className="bg-black bg-opacity-20 absolute top-0 bottom-0 left-0 right-0 opacity-0 hover:opacity-100 focus:opacity-100 group-focus:opacity-100 flex items-end w-full">
        <div className="flex items-center p-4 gap-2 w-full">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <img
                  className="w-6 h-6 rounded-full"
                  src={item.user.profile_image.medium}
                  alt={item.user.name}
                />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-black text-white py-2 px-3 rounded-lg text-xs"
                  sideOffset={5}
                >
                  {item.user.name}
                  <Tooltip.Arrow className="TooltipArrow" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <span className="font-semibold text-xs text-white truncate">
            {upperFirst(item.description || item.alt_description || '')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
