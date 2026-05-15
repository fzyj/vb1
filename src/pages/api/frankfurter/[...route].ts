import type { APIRoute } from 'astro';

export const prerender = false;

const TARGET = 'https://api.frankfurter.dev/v1';

export const GET: APIRoute = async ({ params, request }) => {
  const route = params.route ?? '';
  const search = new URL(request.url).search;

  try {
    const res = await fetch(`${TARGET}/${route}${search}`);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'API request failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
