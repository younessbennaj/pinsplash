import { useContext } from 'react';
import { ToastContext } from '../components/ToastProvider/ToastContext';

export function useToast() {
  return useContext(ToastContext);
}
