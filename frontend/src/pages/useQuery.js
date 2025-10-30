import { useEffect, useState } from 'react';

export function useQuery(fn) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fn()
      .then((d) => { if (active) { setData(d); setError(null); } })
      .catch((e) => { if (active) { setError(e); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [fn]);

  return { data: data || [], error, loading };
}


