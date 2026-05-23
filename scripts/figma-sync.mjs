import fs from 'fs/promises';
import path from 'path';
import process from 'process';

async function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  try {
    const content = await fs.readFile(envPath, 'utf8');
    const variables = {};
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = line.split('=');
      variables[key.trim()] = rest.join('=').trim();
    }
    return variables;
  } catch {
    return {};
  }
}

const env = {
  ...(await loadDotEnv()),
  ...process.env,
};

const FIGMA_TOKEN = env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = env.FIGMA_FILE_KEY;

if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
  console.error('Missing FIGMA_TOKEN or FIGMA_FILE_KEY. Add them to .env or environment variables.');
  process.exit(1);
}

const FIGMA_API_URL = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`;

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function rgbToHex({ r, g, b }) {
  const to8 = (value) => Math.round(Math.min(1, Math.max(0, value)) * 255);
  const hex = [r, g, b].map((value) => to8(value).toString(16).padStart(2, '0')).join('');
  return `#${hex}`;
}

function parseFill(fill) {
  if (!fill || fill.type !== 'SOLID' || !fill.color) return null;
  const hex = rgbToHex(fill.color);
  if (fill.opacity != null && fill.opacity < 1) {
    const alpha = Math.round(Math.min(1, Math.max(0, fill.opacity)) * 100) / 100;
    return `rgba(${Math.round(fill.color.r * 255)}, ${Math.round(fill.color.g * 255)}, ${Math.round(fill.color.b * 255)}, ${alpha})`;
  }
  return hex;
}

function formatTypography(style) {
  const declarations = [];
  if (style.fontFamily) declarations.push(`font-family: ${style.fontFamily};`);
  if (style.fontSize) declarations.push(`font-size: ${style.fontSize}px;`);
  if (style.fontWeight) declarations.push(`font-weight: ${style.fontWeight};`);
  if (style.letterSpacing != null) declarations.push(`letter-spacing: ${style.letterSpacing}px;`);
  if (style.lineHeightPx) declarations.push(`line-height: ${style.lineHeightPx}px;`);
  if (style.paragraphSpacing != null) declarations.push(`margin-bottom: ${style.paragraphSpacing}px;`);
  return declarations.join(' ');
}

function flattenNodes(node, list = []) {
  list.push(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      flattenNodes(child, list);
    }
  }
  return list;
}

function collectStyleTokens(fileData) {
  const styles = fileData.styles ?? {};
  const nodeList = flattenNodes(fileData.document);
  const tokens = {
    colors: {},
    typography: {},
  };

  const styleIds = new Set(Object.keys(styles));

  for (const node of nodeList) {
    if (node.styles) {
      for (const [styleType, styleId] of Object.entries(node.styles)) {
        if (!styleIds.has(styleId)) continue;
        const style = styles[styleId];
        if (!style) continue;
        const name = slugify(style.name || styleId);

        if (style.style_type === 'FILL' && Array.isArray(node.fills)) {
          const fillColor = node.fills.map(parseFill).find(Boolean);
          if (fillColor) {
            tokens.colors[name] = fillColor;
          }
        }

        if (style.style_type === 'TEXT' && node.style) {
          tokens.typography[name] = {
            css: formatTypography(node.style),
            raw: node.style,
          };
        }
      }
    }
  }

  return tokens;
}

async function writeTokenFiles(fileData, tokens) {
  const root = path.resolve(process.cwd());
  const cssPath = path.join(root, 'src', 'styles', 'figma-tokens.css');
  const jsonPath = path.join(root, 'figma', 'figma-file.json');
  await fs.mkdir(path.dirname(jsonPath), { recursive: true });
  await fs.mkdir(path.dirname(cssPath), { recursive: true });

  const cssLines = [
    `/* Auto-generated from Figma file ${FIGMA_FILE_KEY}. Do not edit manually. */`,
    ':root {',
  ];

  for (const [name, value] of Object.entries(tokens.colors)) {
    cssLines.push(`  --figma-color-${name}: ${value};`);
  }

  for (const [name, value] of Object.entries(tokens.typography)) {
    cssLines.push(`  /* ${name} */`);
    cssLines.push(`  --figma-type-${name}: '${value.raw.fontFamily}';`);
    if (value.raw.fontSize) cssLines.push(`  --figma-type-${name}-size: ${value.raw.fontSize}px;`);
    if (value.raw.fontWeight) cssLines.push(`  --figma-type-${name}-weight: ${value.raw.fontWeight};`);
    if (value.raw.lineHeightPx) cssLines.push(`  --figma-type-${name}-line-height: ${value.raw.lineHeightPx}px;`);
  }

  cssLines.push('}');
  await fs.writeFile(cssPath, `${cssLines.join('\n')}\n`, 'utf8');

  const metadata = {
    fileName: fileData.name,
    lastModified: fileData.lastModified,
    documentId: fileData.document.id,
    generatedAt: new Date().toISOString(),
    tokens,
  };

  await fs.writeFile(jsonPath, JSON.stringify(metadata, null, 2), 'utf8');
}

async function run() {
  console.log('Fetching Figma file:', FIGMA_FILE_KEY);
  const response = await fetch(FIGMA_API_URL, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    const payload = await response.text();
    console.error('Figma API request failed:', response.status, payload);
    process.exit(1);
  }

  const data = await response.json();
  const tokens = collectStyleTokens(data);

  if (Object.keys(tokens.colors).length === 0 && Object.keys(tokens.typography).length === 0) {
    console.warn('No style tokens were extracted from the Figma file. Check your file key and styles.');
  }

  await writeTokenFiles(data, tokens);
  console.log('Generated:', 'src/styles/figma-tokens.css', 'and', 'figma/figma-file.json');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
