import { defineCollection, z } from 'astro:content';

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  phase: z.enum(['diseno', 'fabricacion', 'final', 'pruebas']),
});

const proyectoCollection = defineCollection({
  type: 'content',
  schema: z.object({
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
    client: z.string().optional(),
    featuredImage: z.string(),
    specifications: z.object({
      layers: z.number(),
      dimensions: z.string(),
      type: z.string(),
      software: z.string(),
      microcontroller: z.string().optional(),
    }),
    technologies: z.array(z.string()),
    tags: z.array(z.string()),
    images: z.array(imageSchema),
    challenges: z.string().optional(),
    solutions: z.string().optional(),
    timeframe: z.string().optional(),
    objective: z.string().optional(),
    beforeAfter: z
      .object({
        before: z.string(),
        after: z.string(),
        label: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  proyectos: proyectoCollection,
};
