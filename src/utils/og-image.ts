import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { CollectionEntry } from 'astro:content';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxCharsPerLine: number = 28): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3);
}

export async function generateProjectOgImage(project: CollectionEntry<'proyectos'>): Promise<Buffer> {
  const { data, slug } = project;
  const titleLines = wrapText(data.title, 26);
  const categoryLabels: Record<string, string> = {
    artesanal: 'PCB Artesanal',
    profesional: 'PCB Profesional',
    personal: 'Proyecto Personal',
    cliente: 'Proyecto de Cliente',
    universitario: 'Proyecto Académico',
    prototipo: 'Prototipo Electrónico',
  };
  const categoryLabel = categoryLabels[data.category] || data.category;
  const layersText = `${data.specifications.layers} ${data.specifications.layers === 1 ? 'Capa' : 'Capas'}`;
  const softwareText = data.specifications.software || 'KiCad';
  const mcuText = data.specifications.microcontroller || '';

  // Try to locate project image file on disk
  let imageBuffer: Buffer | null = null;
  const possiblePaths = [
    (data.featuredImage as any)?.fsPath,
    path.resolve(process.cwd(), `src/assets/images/proyectos/${slug}/`, path.basename(data.featuredImage.src.split('?')[0])),
  ];

  // Try finding image in the project directory if the specific name differs
  const projectDir = path.resolve(process.cwd(), `src/assets/images/proyectos/${slug}`);
  try {
    const files = await fs.readdir(projectDir);
    if (files.length > 0) {
      possiblePaths.push(path.join(projectDir, files[0]));
    }
  } catch {}

  for (const p of possiblePaths) {
    if (p) {
      try {
        imageBuffer = await fs.readFile(p);
        break;
      } catch {}
    }
  }

  // Process project thumbnail if found
  let projectPhotoComposite: sharp.OverlayOptions | null = null;
  if (imageBuffer) {
    try {
      const photoWidth = 460;
      const photoHeight = 345;
      const roundedCornersSvg = Buffer.from(`
        <svg width="${photoWidth}" height="${photoHeight}">
          <rect x="0" y="0" width="${photoWidth}" height="${photoHeight}" rx="20" ry="20" fill="#fff"/>
        </svg>
      `);

      const processedPhoto = await sharp(imageBuffer)
        .resize(photoWidth, photoHeight, { fit: 'cover', position: 'center' })
        .composite([{ input: roundedCornersSvg, blend: 'dest-in' }])
        .png()
        .toBuffer();

      projectPhotoComposite = {
        input: processedPhoto,
        top: 142,
        left: 670,
      };
    } catch (e) {
      console.error('Error processing project photo for OG image:', e);
    }
  }

  const titleSvgTspans = titleLines
    .map((line, i) => `<tspan x="70" dy="${i === 0 ? '0' : '56'}">${escapeXml(line)}</tspan>`)
    .join('');

  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090d16" />
          <stop offset="60%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#05141b" />
        </linearGradient>

        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>

        <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>

        <pattern id="pcbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.75" opacity="0.25" />
          <circle cx="20" cy="20" r="1.5" fill="#10b981" opacity="0.15" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)" />
      <rect width="1200" height="630" fill="url(#pcbGrid)" />

      <!-- Glowing Circuit Accent Lines -->
      <path d="M -50 150 L 300 150 L 350 200 L 600 200" fill="none" stroke="#10b981" stroke-width="2" opacity="0.3" />
      <circle cx="350" cy="200" r="4" fill="#10b981" opacity="0.5" />
      <circle cx="600" cy="200" r="3" fill="#06b6d4" opacity="0.5" />

      <path d="M 700 500 L 950 500 L 1000 550 L 1250 550" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.2" />
      <circle cx="1000" cy="550" r="4" fill="#f59e0b" opacity="0.4" />

      <!-- Header / Brand -->
      <g transform="translate(70, 65)">
        <!-- IC Chip Icon -->
        <rect x="0" y="0" width="38" height="38" rx="8" fill="#10b981" />
        <path d="M 12 7 L 12 11 M 19 7 L 19 11 M 26 7 L 26 11 M 12 27 L 12 31 M 19 27 L 19 31 M 26 27 L 26 31 M 7 12 L 11 12 M 7 19 L 11 19 M 7 26 L 11 26 M 27 12 L 31 12 M 27 19 L 31 19 M 27 26 L 31 26" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
        <rect x="11" y="11" width="16" height="16" rx="3" fill="#064e3b" stroke="#ffffff" stroke-width="1.5" />

        <!-- Brand Name -->
        <text x="50" y="25" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" letter-spacing="1">
          EMERSON PÉREZ <tspan fill="#10b981">·</tspan> <tspan fill="#94a3b8" font-size="16" font-weight="normal">PCB &amp; HARDWARE</tspan>
        </text>
      </g>

      <!-- Category Eyebrow Badge -->
      <g transform="translate(70, 140)">
        <rect x="0" y="0" width="${categoryLabel.length * 9.5 + 24}" height="32" rx="16" fill="#064e3b" stroke="#059669" stroke-width="1.5" />
        <circle cx="14" cy="16" r="4" fill="#34d399" />
        <text x="26" y="21" fill="#a7f3d0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" letter-spacing="0.5">
          ${escapeXml(categoryLabel.toUpperCase())}
        </text>
      </g>

      <!-- Project Title -->
      <text x="70" y="240" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="800" line-height="1.2">
        ${titleSvgTspans}
      </text>

      <!-- Project Metadata Badges (Bottom Left) -->
      <g transform="translate(70, 440)">
        <!-- Layer Spec -->
        <rect x="0" y="0" width="115" height="42" rx="10" fill="url(#badgeGrad)" stroke="#334155" stroke-width="1.5" />
        <text x="16" y="26" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">
          ⚡ ${escapeXml(layersText)}
        </text>

        <!-- Software Spec -->
        <rect x="127" y="0" width="115" height="42" rx="10" fill="url(#badgeGrad)" stroke="#334155" stroke-width="1.5" />
        <text x="143" y="26" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">
          🛠 ${escapeXml(softwareText)}
        </text>

        ${mcuText ? `
        <!-- MCU Spec -->
        <rect x="254" y="0" width="${mcuText.length * 9.5 + 36}" height="42" rx="10" fill="url(#badgeGrad)" stroke="#334155" stroke-width="1.5" />
        <text x="270" y="26" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600">
          🎮 ${escapeXml(mcuText)}
        </text>
        ` : ''}
      </g>

      <!-- Right Photo Frame / Placeholder Box -->
      <g transform="translate(668, 140)">
        <rect x="0" y="0" width="464" height="349" rx="22" fill="#0f172a" stroke="#334155" stroke-width="2" />
      </g>

      <!-- Footer Bar -->
      <line x1="70" y1="545" x2="1130" y2="545" stroke="#1e293b" stroke-width="1.5" />
      <text x="70" y="585" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="15">
        Portafolio Profesional de Diseño Electrónico y PCBs
      </text>
      <text x="1130" y="585" text-anchor="end" fill="#10b981" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="bold">
        emersonee.github.io/portafolio
      </text>
    </svg>
  `;

  const composites: sharp.OverlayOptions[] = [];
  if (projectPhotoComposite) {
    composites.push(projectPhotoComposite);
  }

  return sharp(Buffer.from(svg))
    .composite(composites)
    .png({ quality: 90 })
    .toBuffer();
}

export async function generateDefaultOgImage(): Promise<Buffer> {
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090d16" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#05141b" />
        </linearGradient>

        <pattern id="pcbGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="0.75" opacity="0.25" />
          <circle cx="20" cy="20" r="1.5" fill="#10b981" opacity="0.15" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)" />
      <rect width="1200" height="630" fill="url(#pcbGrid)" />

      <!-- Glowing Circuit Trace Lines -->
      <path d="M 0 200 L 250 200 L 300 250 L 800 250 L 850 200 L 1200 200" fill="none" stroke="#10b981" stroke-width="2.5" opacity="0.35" />
      <circle cx="300" cy="250" r="5" fill="#10b981" opacity="0.6" />
      <circle cx="800" cy="250" r="5" fill="#06b6d4" opacity="0.6" />

      <path d="M 150 450 L 450 450 L 500 500 L 1050 500" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.25" />
      <circle cx="500" cy="500" r="4" fill="#f59e0b" opacity="0.5" />

      <!-- Center Logo & Branding -->
      <g transform="translate(600, 130)" text-anchor="middle">
        <!-- Big Chip Icon -->
        <rect x="-35" y="0" width="70" height="70" rx="16" fill="#10b981" />
        <path d="M -15 15 L -15 22 M 0 15 L 0 22 M 15 15 L 15 22 M -15 48 L -15 55 M 0 48 L 0 55 M 15 48 L 15 55 M -22 25 L -15 25 M -22 35 L -15 35 M -22 45 L -15 45 M 15 25 L 22 25 M 15 35 L 22 35 M 15 45 L 22 45" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
        <rect x="-15" y="22" width="30" height="26" rx="5" fill="#064e3b" stroke="#ffffff" stroke-width="2" />

        <!-- Author Name -->
        <text y="125" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" letter-spacing="1">
          EMERSON PÉREZ
        </text>

        <!-- Subtitle -->
        <text y="170" fill="#34d399" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="bold" letter-spacing="0.5">
          Diseño y Fabricación de Circuitos Impresos
        </text>

        <!-- Description -->
        <text y="220" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="normal">
          Más de 20 proyectos documentados de principio a fin · KiCad &amp; EasyEDA
        </text>
      </g>

      <!-- Highlights Badges -->
      <g transform="translate(600, 420)" text-anchor="middle">
        <rect x="-360" y="0" width="220" height="48" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="-250" y="30" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600">
          🛠 24 Proyectos
        </text>

        <rect x="-110" y="0" width="220" height="48" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="0" y="30" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600">
          ⚡ 1 a 6 Capas
        </text>

        <rect x="140" y="0" width="220" height="48" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <text x="250" y="30" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600">
          📸 +100 Fotografías
        </text>
      </g>

      <!-- Footer -->
      <line x1="100" y1="530" x2="1100" y2="530" stroke="#1e293b" stroke-width="1.5" />
      <text x="600" y="575" text-anchor="middle" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="16">
        https://emersonee.github.io/portafolio
      </text>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .png({ quality: 90 })
    .toBuffer();
}
