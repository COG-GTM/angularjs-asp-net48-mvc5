import { useEffect, useState } from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  const text = offline
    ? 'You appear to be offline. Please check your connection.'
    : message ?? 'An unexpected error occurred.';

  return (
    <div className={styles.error} role="alert">
      <p>{text}</p>
    </div>
  );
}
