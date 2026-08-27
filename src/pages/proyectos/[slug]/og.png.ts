import type { APIRoute, InferGetStaticPropsType, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateProjectOgImage } from '../../../utils/og-image';

export const getStaticPaths = (async () => {
  const projects = await getCollection('proyectos', ({ data }) => !data.draft);
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: { project },
  }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ props }) => {
  const { project } = props as Props;
  const pngBuffer = await generateProjectOgImage(project);

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
