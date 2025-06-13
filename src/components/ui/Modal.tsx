import React from 'react';
import { X } from 'lucide-react';
import { styles } from '@/lib/styles/common';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modal.overlay} onClick={onClose} />
      <div className={styles.modal.container}>
        <div className={styles.modal.content}>
          <div className={styles.modal.panel}>
            <div className={styles.modal.header}>
              <h3 className={styles.modal.title}>{title}</h3>
              <button
                type="button"
                className={styles.modal.close}
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className={styles.modal.body}>
              {children}
            </div>
            {footer && (
              <div className={styles.modal.footer}>
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 