import React, { useEffect } from 'react';
import styles from './ToastNotification.module.scss';

export type ToastType = 'error' | 'warning' | 'success';

interface ToastNotificationProps {
  message: string;
  type: ToastType;
  open: boolean;
  handleClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type,
  open,
  handleClose,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div
      className={`${styles.toast} ${styles[`toast--${type}`]}`}
      role="alert"
      aria-live="assertive"
    >
      <span>{message}</span>
      <button
        onClick={handleClose}
        className={styles.closeButton}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default ToastNotification;
