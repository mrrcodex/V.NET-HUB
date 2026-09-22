import { useCallback, useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const show = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    clearTimeout(show._t);
    show._t = setTimeout(() => setVisible(false), 3000);
  }, []);

  return { message, visible, show };
}
