import React from 'react';
import { useQuery } from './useQuery.js';
import { apiGet } from '../api.js';

export default function Users() {
  const { data, error, loading } = useQuery(() => apiGet('/api/users'));

  if (loading) return <p>Loading users…</p>;
  if (error) return <p style={{ color: 'crimson' }}>{error.message}</p>;

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {data.map(u => (
        <div key={u.id} style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>{u.name}</h3>
          <p><b>Email:</b> {u.email}</p>
          <p><b>Phone:</b> {u.phone || 'N/A'}</p>
          <p><b>City:</b> {u.city || 'N/A'}</p>
          <p><b>Company:</b> {u.company || 'N/A'}</p>
        </div>
      ))}
    </div>
  );
}


