# Portafolio PCB

Portafolio profesional de Emerson Pérez, construido con Astro y Tailwind CSS.

## Desarrollo local

```bash
npm ci
npm run dev
```

## Validación y build

```bash
npm run check
npm run typecheck
npm run build
npm run preview
```

El sitio se genera como contenido estático en `dist/` y está configurado para
publicarse en GitHub Pages bajo `/portafolio/`. Cada push a `main` ejecuta el
workflow de `.github/workflows/deploy.yml`.

## Contenido

Los proyectos se encuentran en `src/content/proyectos/`. El esquema de Astro
valida metadatos, imágenes, fases y especificaciones durante el build.
