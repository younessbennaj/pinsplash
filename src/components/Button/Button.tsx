import { ChevronDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

function Button({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
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
      {children} <ChevronDownIcon className="w-4 h-4" />
    </button>
  );
}

export default Button;
