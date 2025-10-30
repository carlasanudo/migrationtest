const base = '';

export async function apiGet(path) {
  const res = await fetch(base + path);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}


