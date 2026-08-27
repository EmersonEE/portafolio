import { defineCollection, z } from 'astro:content';

const proyectoCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      category: z.enum([
        'artesanal',
        'profesional',
        'personal',
        'cliente',
        'universitario',
        'prototipo',
      ]),
      status: z.enum(['completado', 'en-progreso', 'pausado']),
      draft: z.boolean().optional(),
      client: z.string().optional(),
      featuredImage: image(),
      specifications: z.object({
        layers: z.number(),
        type: z.string(),
        software: z.string(),
        microcontroller: z.string().optional(),
      }),
      technologies: z.array(z.string()),
      tags: z.array(z.string()),
      images: z.array(
        z.object({
          src: image(),
          alt: z.string(),
          phase: z.enum(['diseno', 'fabricacion', 'final', 'pruebas']),
        })
      ),
      challenges: z.string().optional(),
      solutions: z.string().optional(),
      timeframe: z.string().optional(),
      objective: z.string().optional(),
      beforeAfter: z
        .object({
          before: image(),
          after: image(),
          label: z.string().optional(),
        })
        .optional(),
    }),
});

export const collections = {
  proyectos: proyectoCollection,
};
