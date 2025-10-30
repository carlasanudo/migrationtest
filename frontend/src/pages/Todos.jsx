import React from 'react';
import { useQuery } from './useQuery.js';
import { apiGet } from '../api.js';

export default function Todos() {
  const { data, error, loading } = useQuery(() => apiGet('/api/todos'));

  if (loading) return <p>Loading todos…</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error.message}</p>;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {data.map(t => (
        <div key={t.id} style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>{t.title}</h3>
          <span style={{ padding: '4px 10px', borderRadius: 999, background: t.completed ? '#2196f3' : '#ff9800', color: '#fff' }}>
            {t.completed ? 'Complete' : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  );
}


