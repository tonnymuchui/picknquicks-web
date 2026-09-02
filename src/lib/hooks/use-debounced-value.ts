import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [settledValue, setSettledValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setSettledValue(value), delay);
    return () => clearTimeout(timeout);
  }, [delay, value]);

  return settledValue;
}
