import React from 'react';
import { useQuery } from './useQuery.js';
import { apiGet } from '../api.js';

export default function Posts() {
  const { data, error, loading } = useQuery(() => apiGet('/api/posts'));

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error.message}</p>;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {data.map(p => (
        <div key={p.id} style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>{p.title}</h3>
          <p>{p.body || 'No content'}</p>
          <p><b>User ID:</b> {p.user_id}</p>
        </div>
      ))}
    </div>
  );
}


