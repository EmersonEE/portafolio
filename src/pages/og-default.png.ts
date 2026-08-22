import type { APIRoute } from 'astro';
import { generateDefaultOgImage } from '../utils/og-image';

export const GET: APIRoute = async () => {
  const pngBuffer = await generateDefaultOgImage();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
