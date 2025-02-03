import { Toast as ToastPrimitive } from 'radix-ui';
import { ToastContext } from './ToastContext';
import { useState } from 'react';
import classNames from 'classnames';

function Toast({
  id,
  message,
  variant = 'success',
  onClose,
}: {
  id: number;
  message: string;
  onClose: () => void;
  variant: 'success' | 'error';
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ToastPrimitive.Root
      key={id}
      className={classNames(
        'shadow-md p-2 rounded-full text-sm px-2.5 font-medium',
        {
          'bg-green-50 text-green-700': variant === 'success',
          'bg-red-50 text-red-800': variant === 'error',
        },
      )}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (!open) {
          onClose();
        }
      }}
    >
      <ToastPrimitive.Title asChild>
        <div className="flex gap-3 items-center">
          <span className="bg-white px-2.5 py-0.5 shadow-md rounded-full">
            Success
          </span>
          <span>{message}</span>
        </div>
      </ToastPrimitive.Title>
    </ToastPrimitive.Root>
  );
}

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<
    {
      id: number;
      message: string;
      variant: 'success' | 'error';
    }[]
  >([]);

  function createToast({
    message,
    variant,
  }: {
    message: string;
    variant: 'success' | 'error';
  }) {
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id: window.crypto.getRandomValues(new Uint32Array(1))[0],
        message,
        variant,
      },
    ]);
  }

  function removeToast(id: number) {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }
  return (
    <ToastContext.Provider value={{ createToast }}>
      <ToastPrimitive.Provider duration={3000} swipeDirection="right">
        {toasts.map((toast) => (
          <Toast
            variant={toast.variant}
            key={toast.id}
            id={toast.id}
            message={toast.message}
            onClose={() => {
              removeToast(toast.id);
            }}
          />
        ))}
        {children}
        <ToastPrimitive.Viewport className="ToastViewport" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
