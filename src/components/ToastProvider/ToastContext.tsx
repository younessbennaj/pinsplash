import { createContext } from 'react';

export const ToastContext = createContext<{
  createToast: ({
    message,
    duration,
    variant,
  }: {
    message: string;
    duration?: number;
    variant: 'success' | 'error';
  }) => void;
}>({
  createToast: () => {
    throw new Error(
      "You can't call showToast() outside of a <ToastProvider> – add it to your tree.",
    );
  },
});
