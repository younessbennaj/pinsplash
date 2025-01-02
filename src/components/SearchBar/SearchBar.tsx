import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

function SearchBar({ disabled = false }: { disabled?: boolean }) {
  return (
    <div
      className={classNames(
        'group px-3.5 py-2.5 border border-solid border-neutral-200 rounded-lg flex items-center bg-neutral-50 focus-within:border-indigo-700 focus-within:outline focus-within:outline-2 focus-within:outline-indigo-200',
        {
          'hover:cursor-text': !disabled,
          'hover:cursor-not-allowed': disabled,
        },
      )}
    >
      <input
        disabled={disabled}
        className={classNames(
          'w-full  text-sm focus:outline-none placeholder:text-neutral-500 bg-neutral-50',
          {
            'text-neutral-900  hover:cursor-text': !disabled,
            'text-neutral-400 hover:cursor-not-allowed': disabled,
          },
        )}
        type="text"
        placeholder="Search image Eg. Landscape"
      />
      <MagnifyingGlassIcon className="size-4 text-neutral-400" />
    </div>
  );
}

export default SearchBar;
