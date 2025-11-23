import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeButton?: boolean;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, size = 'md', closeButton = true, className, children, ...props }, ref) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div
          ref={ref}
          className={cn(
            'relative bg-white rounded-xl shadow-xl w-full mx-4',
            sizeStyles[size],
            className
          )}
          {...props}
        >
          {(title || closeButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && <h2 className="text-xl font-bold text-primary-800">{title}</h2>}
              {closeButton && (
                <button
                  onClick={onClose}
                  className="ml-auto text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
