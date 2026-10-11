export interface AvatarSample {
  id: string;
  name: string;
  role: string;
  src: string;
}

// ── Avatar builder ────────────────────────────────────────────────────────────

/**
 * Hair styles for makeAvatar.
 * - none       Bald
 * - short      Close-cropped cap
 * - fuzzy      Full round fuzzy
 * - rounded    Two side puffs
 * - curly      Voluminous curly mass
 * - long       Long straight, falling past shoulders
 * - bob        Chin-length bob
 * - spiky      Spiky points
 * - fringe     Long with blunt straight-across fringe/bangs
 * - ponytail   Hair pulled back, tail dropping behind
 * - mohawk     Strip of hair down the centre
 * - braids     Two braids falling at the sides
 */
export type HairStyle = 'none' | 'short' | 'fuzzy' | 'rounded' | 'curly' | 'long' | 'bob' | 'spiky' | 'fringe' | 'ponytail' | 'mohawk' | 'braids' | 'swept';

/**
 * Glasses styles for makeAvatar.
 * - rectangular  Standard rectangular frames (default)
 * - round        Circular frames
 * - cat          Cat-eye frames, angled up at outer corners
 * - rimless      Thin wire-frame circles, no thick border
 */
export type GlassesStyle = 'rectangular' | 'round' | 'cat' | 'rimless' | 'sunglasses';

/**
 * Accessory for makeAvatar — rendered on top of hair.
 * - headband   Thin band across the forehead
 * - cap        Flat-brim baseball cap
 * - beanie     Knitted beanie pulled down to brow
 * - scarf      Wrapped scarf covering neck and lower face
 */
export type Accessory = 'headband' | 'cap' | 'beanie' | 'scarf';

export interface AvatarConfig {
  /** Background circle color */
  bg: string;
  /** Skin tone — used for face circle and shoulders */
  skin: string;
  /** Hair style and color */
  hair?: { style: HairStyle; color: string };
  /** Eye vertical position — defaults to 14.5 */
  eyeY?: number;
  /** Total horizontal distance between eye centers — defaults to 5 */
  eyeSpacing?: number;
  /** Glasses style — omit for no glasses */
  glasses?: GlassesStyle;
  /** Accessory rendered on top of hair */
  accessory?: { type: Accessory; color: string };
  /** Narrow shoulder path — auto-set for long/fringe styles */
  narrowShoulders?: boolean;
  /** Raw SVG string appended just before </svg> — for custom overlays */
  overlay?: string;
}


function _buildHair(style: HairStyle, color: string): { before: string; after: string } {
  const c = color;
  switch (style) {
    case 'none':
      return { before: '', after: '' };
    case 'short':
      return {
        before: `<path d="M12 17 Q11 5 20 5 Q29 5 28 17 Q27 9 20 9 Q13 9 12 17Z" fill="${c}"/>`,
        after: '',
      };
    case 'fuzzy':
      return {
        before: `<circle cx="20" cy="13" r="11" fill="${c}"/>`,
        after: '',
      };
    case 'rounded':
      return {
        before:
          `<path d="M13 12 Q12 3 20 3 Q28 3 27 12 Q25 8 20 8 Q15 8 13 12Z" fill="${c}"/>` +
          `<circle cx="13" cy="9" r="5" fill="${c}"/>` +
          `<circle cx="27" cy="9" r="5" fill="${c}"/>`,
        after: '',
      };
    case 'curly':
      return {
        before:
          `<ellipse cx="20" cy="9" rx="11" ry="7" fill="${c}"/>` +
          `<ellipse cx="11" cy="16" rx="4.5" ry="6" fill="${c}"/>` +
          `<ellipse cx="29" cy="16" rx="4.5" ry="6" fill="${c}"/>` +
          `<ellipse cx="14" cy="10" rx="4" ry="4" fill="${c}"/>` +
          `<ellipse cx="26" cy="10" rx="4" ry="4" fill="${c}"/>`,
        after: '',
      };
    case 'long':
      return {
        before: `<path d="M10 14 Q10 3 20 3 Q30 3 30 14 L31 40 Q26 42 20 42 Q14 42 9 40Z" fill="${c}"/>`,
        after: '',
      };
    case 'bob':
      return {
        before: `<path d="M10 15 Q10 3 20 3 Q30 3 30 15 L30 25 Q27 29 20 29 Q13 29 10 25Z" fill="${c}"/>`,
        after: `<path d="M12 13 Q12 7 20 7 Q28 7 28 13 Q26 9 20 9 Q14 9 12 13Z" fill="${c}"/>`,
      };
    case 'spiky':
      return {
        before: `<path d="M13 14 Q12 8 15 4 L17 8 Q18 3 20 2 Q22 3 23 8 L25 4 Q28 8 27 14 Q26 9 20 8 Q14 9 13 14Z" fill="${c}"/>`,
        after: '',
      };
    case 'fringe':
      return {
        before: `<path d="M10 14 Q10 3 20 3 Q30 3 30 14 L30 38 Q26 40 20 40 Q14 40 10 38Z" fill="${c}"/>`,
        after: `<rect x="12" y="7" width="15" height="5" fill="${c}"/>`,
      };
    case 'ponytail':
      // Hair pulled back on top, single tail dropping at the back
      return {
        before:
          `<path d="M12 14 Q12 4 20 4 Q28 4 28 14 Q26 9 20 9 Q14 9 12 14Z" fill="${c}"/>` +
          `<path d="M27 8 Q34 10 32 22 Q30 28 28 32 Q27 26 28 20 Q29 13 27 8Z" fill="${c}"/>`,
        after: '',
      };
    case 'mohawk':
      // Shaved sides, strip of hair down the centre
      return {
        before:
          `<path d="M17 14 Q17 2 20 2 Q23 2 23 14 Q22 8 20 8 Q18 8 17 14Z" fill="${c}"/>`,
        after: '',
      };
    case 'braids':
      // Two braids falling at the sides
      return {
        before:
          `<path d="M12 14 Q12 4 20 4 Q28 4 28 14 Q26 9 20 9 Q14 9 12 14Z" fill="${c}"/>`,
        after:
          `<path d="M11 16 Q9 22 11 28 Q13 34 11 38 Q13 32 13 26 Q13 20 11 16Z" fill="${c}"/>` +
          `<path d="M29 16 Q31 22 29 28 Q27 34 29 38 Q27 32 27 26 Q27 20 29 16Z" fill="${c}"/>`,
      };
    case 'swept':
      // Side-swept wave — mass sweeps left-to-right over the forehead
      return {
        before:
          `<path d="M11 16 Q10 4 20 3 Q30 3 29 14 Q26 9 20 9 Q13 9 11 16Z" fill="${c}"/>`,
        after:
          `<path d="M11 12 Q14 7 20 8 Q27 9 29 12 Q24 10 18 11 Q13 12 11 16Z" fill="${c}" opacity="0.55"/>` +
          `<path d="M11 15 Q15 11 21 11 Q27 11 29 13 Q23 12 17 13 Q12 14 11 17Z" fill="${c}" opacity="0.35"/>`,
      };
  }
}

function _buildGlasses(style: GlassesStyle, eyeY: number, eyeSpacing: number): string {
  // Glasses sit wider than the eye pupils — offset = eyeHalf * 1.6 (matches original at eyeSpacing=5)
  const eyeHalf = eyeSpacing / 2;
  const lx = 20 - eyeHalf * 1.6;
  const rx = 20 + eyeHalf * 1.6;
  const fw = 2.5; // frame half-width
  const y0 = eyeY - 1.75;
  const bridgeL = lx + fw;
  const bridgeR = rx - fw;
  switch (style) {
    case 'rectangular':
      return (
        `<rect x="${lx - fw}" y="${y0}" width="${fw * 2}" height="3.5" rx="0.5" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>` +
        `<rect x="${rx - fw}" y="${y0}" width="${fw * 2}" height="3.5" rx="0.5" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>` +
        `<line x1="${bridgeL}" y1="${eyeY}" x2="${bridgeR}" y2="${eyeY}" stroke="#1a1a1a" stroke-width="0.9"/>` +
        `<circle cx="${lx}" cy="${eyeY}" r="1" fill="#1a1a1a"/>` +
        `<circle cx="${rx}" cy="${eyeY}" r="1" fill="#1a1a1a"/>`
      );
    case 'round':
      return (
        `<circle cx="${lx}" cy="${eyeY}" r="${fw}" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>` +
        `<circle cx="${rx}" cy="${eyeY}" r="${fw}" fill="none" stroke="#1a1a1a" stroke-width="0.9"/>` +
        `<line x1="${bridgeL}" y1="${eyeY}" x2="${bridgeR}" y2="${eyeY}" stroke="#1a1a1a" stroke-width="0.9"/>` +
        `<circle cx="${lx}" cy="${eyeY}" r="1" fill="#1a1a1a"/>` +
        `<circle cx="${rx}" cy="${eyeY}" r="1" fill="#1a1a1a"/>`
      );
    case 'cat':
      return (
        `<path d="M${lx - fw} ${eyeY + 1.5} L${lx - fw} ${eyeY - 0.5} Q${lx - fw + 0.5} ${y0 - 0.5} ${lx} ${y0 - 1} Q${lx + fw - 0.5} ${y0 - 0.5} ${lx + fw} ${eyeY}" fill="none" stroke="#1a1a1a" stroke-width="0.9" stroke-linejoin="round"/>` +
        `<path d="M${rx - fw} ${eyeY + 1.5} L${rx - fw} ${eyeY - 0.5} Q${rx - fw + 0.5} ${y0 - 0.5} ${rx} ${y0 - 1} Q${rx + fw - 0.5} ${y0 - 0.5} ${rx + fw} ${eyeY}" fill="none" stroke="#1a1a1a" stroke-width="0.9" stroke-linejoin="round"/>` +
        `<line x1="${bridgeL}" y1="${eyeY}" x2="${bridgeR}" y2="${eyeY}" stroke="#1a1a1a" stroke-width="0.9"/>` +
        `<circle cx="${lx}" cy="${eyeY}" r="1" fill="#1a1a1a"/>` +
        `<circle cx="${rx}" cy="${eyeY}" r="1" fill="#1a1a1a"/>`
      );
    case 'rimless':
      return (
        `<circle cx="${lx}" cy="${eyeY}" r="${fw}" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>` +
        `<circle cx="${rx}" cy="${eyeY}" r="${fw}" fill="none" stroke="#1a1a1a" stroke-width="0.5"/>` +
        `<line x1="${bridgeL}" y1="${eyeY}" x2="${bridgeR}" y2="${eyeY}" stroke="#1a1a1a" stroke-width="0.5"/>` +
        `<circle cx="${lx}" cy="${eyeY}" r="1" fill="#1a1a1a"/>` +
        `<circle cx="${rx}" cy="${eyeY}" r="1" fill="#1a1a1a"/>`
      );
    case 'sunglasses':
      return (
        `<rect x="${lx - fw}" y="${eyeY - 2}" width="${fw * 2}" height="4" rx="${fw}" fill="#1a1a1a"/>` +
        `<rect x="${rx - fw}" y="${eyeY - 2}" width="${fw * 2}" height="4" rx="${fw}" fill="#1a1a1a"/>` +
        `<line x1="${bridgeL}" y1="${eyeY}" x2="${bridgeR}" y2="${eyeY}" stroke="#1a1a1a" stroke-width="0.9"/>`
      );
  }
}

function _buildAccessory(type: Accessory, color: string): string {
  switch (type) {
    case 'headband':
      // Thin curved band across forehead
      return `<path d="M10 10 Q20 7 30 10 Q30 13 20 11 Q10 13 10 10Z" fill="${color}"/>`;
    case 'cap':
      // Solid half-dome crown, ellipse brim at the base
      return (
        `<path d="M11 9 Q11 1 20 1 Q29 1 29 9Z" fill="${color}"/>` +
        `<ellipse cx="20" cy="9" rx="13" ry="2" fill="${color}"/>`
      );
    case 'beanie':
      return `<path d="M10 11 Q10 1 20 1 Q30 1 30 11 Q28 7 20 7 Q12 7 10 11Z" fill="${color}"/>`;
    case 'scarf':
      // Two folded bands across lower face/neck
      return (
        `<path d="M8 24 Q20 21 32 24 Q32 28 20 26 Q8 28 8 24Z" fill="${color}"/>` +
        `<path d="M10 26 Q20 24 30 26 Q30 30 20 28 Q10 30 10 26Z" fill="${color}" opacity="0.75"/>`
      );
  }
}

/**
 * Build an SVG avatar string. Wrap in svgUri() to get a data URI for use in <img> src.
 *
 * @example
 * svgUri(makeAvatar({ bg: '#4a6fe6', skin: '#FDDBB4', hair: { style: 'short', color: '#1a1a1a' } }))
 * svgUri(makeAvatar({ bg: '#ff9020', skin: '#F0C27F', hair: { style: 'bob', color: '#5C3317' }, glasses: 'cat' }))
 * svgUri(makeAvatar({ bg: '#3eba7c', skin: '#D4975A', hair: { style: 'short', color: '#1a1a1a' }, accessory: { type: 'cap', color: '#c00' } }))
 */
export function makeAvatar(config: AvatarConfig): string {
  const {
    bg,
    skin,
    hair: hairConfig,
    glasses,
    accessory,
    overlay = '',
  } = config;

  const eyeY = config.eyeY ?? 14.5;
  const eyeSpacing = config.eyeSpacing ?? 5;
  const lx = 20 - eyeSpacing / 2;
  const rx = 20 + eyeSpacing / 2;
  const narrow = config.narrowShoulders ?? (['long', 'fringe', 'ponytail', 'braids'].includes(hairConfig?.style ?? ''));
  const hair = hairConfig ? _buildHair(hairConfig.style, hairConfig.color) : { before: '', after: '' };

  const shoulderPath = narrow
    ? `M14 40 Q14 29 20 29 Q26 29 26 40`
    : `M2 40 Q2 28 20 28 Q38 28 38 40`;

  const mouthPath = `M${lx} ${eyeY + 4.5} Q20 ${eyeY + 6.5} ${rx} ${eyeY + 4.5}`;

  const eyeElements = glasses
    ? _buildGlasses(glasses, eyeY, eyeSpacing)
    : `<circle cx="${lx}" cy="${eyeY}" r="1.4" fill="#1a1a1a"/>` +
      `<circle cx="${rx}" cy="${eyeY}" r="1.4" fill="#1a1a1a"/>`;

  const accessoryElement = accessory ? _buildAccessory(accessory.type, accessory.color) : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">` +
    `<circle cx="20" cy="20" r="20" fill="${bg}"/>` +
    hair.before +
    `<circle cx="20" cy="16" r="8" fill="${skin}"/>` +
    hair.after +
    accessoryElement +
    eyeElements +

    `<path d="${mouthPath}" fill="none" stroke="#1a1a1a" stroke-width="1.2" stroke-linecap="round"/>` +
    `<path d="${shoulderPath}" fill="${skin}"/>` +
    overlay +
    `</svg>`
  );
}

// ── Data URI helper ───────────────────────────────────────────────────────────

export function svgUri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const sampleAvatars: AvatarSample[] = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    role: 'Designer',
    src: svgUri(makeAvatar({ bg: '#4a6fe6', skin: '#FDDBB4', hair: { style: 'short', color: '#1a1a1a' } })),
  },
  {
    id: 'jordan-kim',
    name: 'Jordan Kim',
    role: 'Engineer',
    src: svgUri(makeAvatar({ bg: '#3eba7c', skin: '#D4975A', hair: { style: 'long', color: '#1a1a1a' }, eyeSpacing: 6 })),
  },
  {
    id: 'morgan-lee',
    name: 'Morgan Lee',
    role: 'Researcher',
    src: svgUri(makeAvatar({ bg: '#9b6fe6', skin: '#FDDBB4', hair: { style: 'curly', color: '#8B2500' } })),
  },
  {
    id: 'taylor-chen',
    name: 'Taylor Chen',
    role: 'Product Manager',
    src: svgUri(makeAvatar({ bg: '#ff9020', skin: '#F0C27F', hair: { style: 'short', color: '#5C3317' }, glasses: 'round', eyeSpacing: 3.5 })),
  },
  {
    id: 'casey-park',
    name: 'Casey Park',
    role: 'Engineer',
    src: svgUri(makeAvatar({ bg: '#29b2b2', skin: '#A0674A', hair: { style: 'fuzzy', color: '#1a1a1a' } })),
  },
  {
    id: 'riley-scott',
    name: 'Riley Scott',
    role: 'Designer',
    src: svgUri(makeAvatar({ bg: '#e63577', skin: '#FDDBB4', hair: { style: 'braids', color: '#C9A84C' }, eyeSpacing: 6.5 })),
  },
  {
    id: 'sam-wilson',
    name: 'Sam Wilson',
    role: 'Researcher',
    src: svgUri(makeAvatar({ bg: '#e6a020', skin: '#6B3D2E', hair: { style: 'short', color: '#1a1a1a' } })),
  },
  {
    id: 'quinn-davis',
    name: 'Quinn Davis',
    role: 'Product Manager',
    src: svgUri(makeAvatar({ bg: '#6f6fe6', skin: '#C49A6C', hair: { style: 'bob', color: '#4a2c1a' }, glasses: 'rectangular', eyeSpacing: 4 })),
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Engineer',
    src: svgUri(makeAvatar({ bg: '#1a8c8c', skin: '#C17A4A', hair: { style: 'ponytail', color: '#1a1a1a' } })),
  },
  {
    id: 'marcus-johnson',
    name: 'Marcus Johnson',
    role: 'Product Manager',
    src: svgUri(makeAvatar({ bg: '#e05535', skin: '#8C6D62', eyeSpacing: 7 })),
  },
  {
    id: 'sofia-russo',
    name: 'Sofia Russo',
    role: 'Designer',
    src: svgUri(makeAvatar({ bg: '#c46b8a', skin: '#F0C090', hair: { style: 'curly', color: '#4a2c1a' } })),
  },
  {
    id: 'kai-nakamura',
    name: 'Kai Nakamura',
    role: 'Engineer',
    src: svgUri(makeAvatar({ bg: '#4a7296', skin: '#E8B88A', hair: { style: 'spiky', color: '#1a1a1a' }, eyeSpacing: 3.5 })),
  },
  {
    id: 'amara-diallo',
    name: 'Amara Diallo',
    role: 'Researcher',
    src: svgUri(makeAvatar({ bg: '#2d7a4a', skin: '#753D2A', hair: { style: 'rounded', color: '#1a1a1a' } })),
  },
  {
    id: 'lena-mueller',
    name: 'Lena Mueller',
    role: 'Product Manager',
    src: svgUri(makeAvatar({ bg: '#8a4ac4', skin: '#FFE0C8', hair: { style: 'bob', color: '#E8E8E0' }, eyeSpacing: 6 })),
  },
  {
    id: 'diego-santos',
    name: 'Diego Santos',
    role: 'Engineer',
    src: svgUri(makeAvatar({ bg: '#c45a1a', skin: '#C08050', hair: { style: 'short', color: '#1a1a1a' } })),
  },
  {
    id: 'yuki-tanaka',
    name: 'Yuki Tanaka',
    role: 'Designer',
    src: svgUri(makeAvatar({ bg: '#2a9470', skin: '#F5D5A8', hair: { style: 'fringe', color: '#1a1a1a' }, eyeSpacing: 4 })),
  },
  {
    id: 'oliver-bennett',
    name: 'Oliver Bennett',
    role: 'Product Manager',
    src: svgUri(makeAvatar({ bg: '#3a6e3a', skin: '#FDDBB4', hair: { style: 'short', color: '#888888' }, glasses: 'rectangular', eyeSpacing: 6.5 })),
  },
  {
    // Beanie, warm brown skin, round glasses
    id: 'nadia-osei',
    name: 'Nadia Osei',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#8BEBF6',
      skin: '#A0674A',
      hair: { style: 'fringe', color: '#1a1a1a' },
      accessory: { type: 'beanie', color: '#8BA0F6' },
      glasses: 'round',
    })),
  },
  {
    // Cap, light skin, spiky blond hair
    id: 'finn-larsen',
    name: 'Finn Larsen',
    role: 'Designer',
    src: svgUri(makeAvatar({
      bg: '#4a7296',
      skin: '#FDDBB4',
      hair: { style: 'spiky', color: '#C9A84C' },
      accessory: { type: 'cap', color: '#1a1a1a' },
      eyeSpacing: 3.5,
    })),
  },
  {
    // Long dark hair, medium skin, cat-eye glasses
    id: 'elena-vasquez',
    name: 'Elena Vasquez',
    role: 'Product Manager',
    src: svgUri(makeAvatar({
      bg: '#9b6fe6',
      skin: '#C08050',
      hair: { style: 'spiky', color: '#1a1a1a' },
      glasses: 'cat',
    })),
  },
  {
    // Fuzzy afro, dark skin, no glasses
    id: 'tobias-mensah',
    name: 'Tobias Mensah',
    role: 'Researcher',
    src: svgUri(makeAvatar({
      bg: '#2d7a4a',
      skin: '#734A3C',
      hair: { style: 'fuzzy', color: '#1a1a1a' },
      eyeSpacing: 7,
    })),
  },
  {
    // Bob, pale skin, rimless glasses, platinum hair
    id: 'ingrid-holm',
    name: 'Ingrid Holm',
    role: 'Designer',
    src: svgUri(makeAvatar({
      bg: '#823327',
      skin: '#FFE0C8',
      hair: { style: 'ponytail', color: '#A1B2F6' },
      glasses: 'rimless',
    })),
  },
  {
    // Headband, curly red hair, freckled light skin
    id: 'cora-walsh',
    name: 'Cora Walsh',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#e63577',
      skin: '#F0C27F',
      hair: { style: 'curly', color: '#8B2500' },
      accessory: { type: 'headband', color: '#e63577' },
      eyeSpacing: 4,
    })),
  },
  {
    // Short hair, medium East Asian skin, rectangular glasses
    id: 'jin-park',
    name: 'Jin Park',
    role: 'Product Manager',
    src: svgUri(makeAvatar({
      bg: '#1a8c8c',
      skin: '#E8B88A',
      hair: { style: 'short', color: '#1a1a1a' },
      glasses: 'rectangular',
    })),
  },
  {
    // Beanie, dark skin, bald underneath
    id: 'kofi-agyeman',
    name: 'Kofi Agyeman',
    role: 'Researcher',
    src: svgUri(makeAvatar({
      bg: '#e05535',
      skin: '#5C2D1E',
      hair: { style: 'rounded', color: '#1a1a1a' },
      accessory: { type: 'beanie', color: '#3a3a3a' },
      eyeSpacing: 6,
    })),
  },
  {
    // Fringe, light olive skin, no glasses
    id: 'mei-lin',
    name: 'Mei Lin',
    role: 'Designer',
    src: svgUri(makeAvatar({
      bg: '#29b2b2',
      skin: '#D4975A',
      hair: { style: 'bob', color: '#1a1a1a' },
    })),
  },
  {
    // Rounded puffs, medium skin, headband
    id: 'zara-ibrahim',
    name: 'Zara Ibrahim',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#3a6e3a',
      skin: '#C17A4A',
      hair: { style: 'rounded', color: '#1a1a1a' },
      accessory: { type: 'headband', color: '#e6a020' },
      eyeSpacing: 3.5,
    })),
  },
  {
    // Long dark hair, warm skin, teal scarf
    id: 'aisha-karimi',
    name: 'Aisha Karimi',
    role: 'Designer',
    src: svgUri(makeAvatar({
      bg: '#2a3d8c',
      skin: '#C17A4A',
      hair: { style: 'fuzzy', color: '#1a1a1a' },
      accessory: { type: 'scarf', color: '#29b2b2' },
    })),
  },
  {
    // Curly hair, light skin, red scarf
    id: 'reuben-cole',
    name: 'Reuben Cole',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#4a7296',
      skin: '#F0C27F',
      hair: { style: 'curly', color: '#5C3317' },
      accessory: { type: 'scarf', color: '#e05535' },
      eyeSpacing: 6.5,
    })),
  },
  {
    // Bald, dark skin, purple scarf
    id: 'grace-achebe',
    name: 'Grace Achebe',
    role: 'Researcher',
    src: svgUri(makeAvatar({
      bg: '#EFA959',
      skin: '#7B4B3C',
      accessory: { type: 'scarf', color: '#FFEF3D' },
    })),
  },
  {
    // Bob, medium skin, cat-eye glasses, orange scarf
    id: 'vera-santos',
    name: 'Vera Santos',
    role: 'Product Manager',
    src: svgUri(makeAvatar({
      bg: '#c46b8a',
      skin: '#D4975A',
      hair: { style: 'bob', color: '#1a1a1a' },
      glasses: 'sunglasses',
      accessory: { type: 'scarf', color: '#e6a020' },
      eyeSpacing: 4,
    })),
  },
  {
    id: 'simone-dupont',
    name: 'Simone Dupont',
    role: 'Designer',
    src: svgUri(makeAvatar({
      bg: '#c46b8a',
      skin: '#FDDBB4',
      hair: { style: 'ponytail', color: '#1a1a1a' },
    })),
  },
  {
    id: 'rex-okafor',
    name: 'Rex Okafor',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#35B0E0',
      skin: '#8B5542',
      hair: { style: 'mohawk', color: '#e63577' },
      eyeSpacing: 7,
    })),
  },
  {
    id: 'hana-choi',
    name: 'Hana Choi',
    role: 'Researcher',
    src: svgUri(makeAvatar({
      bg: '#3eba7c',
      skin: '#E8B88A',
      glasses: 'round',
      hair: { style: 'braids', color: '#1a1a1a' },
    })),
  },
  {
    // Locs, deep brown skin, teal bg
    id: 'adaeze-nwosu',
    name: 'Adaeze Nwosu',
    role: 'Designer',
    src: svgUri(makeAvatar({
      bg: '#1a7a7a',
      skin: '#6B3020',
      hair: { style: 'braids', color: '#3a1a0a' },
    })),
  },
  {
    // Short silver hair, pale skin, cat-eye glasses, wide-set eyes
    id: 'leon-fischer',
    name: 'Leon Fischer',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#5a5a8a',
      skin: '#FFE0C8',
      hair: { style: 'short', color: '#C0C0C0' },
      glasses: 'cat',
      eyeSpacing: 6.5,
    })),
  },
  {
    // Curly auburn hair, medium skin, headband, close-set eyes
    id: 'bianca-ferreira',
    name: 'Bianca Ferreira',
    role: 'Product Manager',
    src: svgUri(makeAvatar({
      bg: '#c47a20',
      skin: '#D4A870',
      hair: { style: 'curly', color: '#8B2500' },
      accessory: { type: 'headband', color: '#c47a20' },
      eyeSpacing: 3.5,
    })),
  },
  {
    // Fringe, light skin, rimless glasses, wide-set eyes
    id: 'sven-lindqvist',
    name: 'Sven Lindqvist',
    role: 'Researcher',
    src: svgUri(makeAvatar({
      bg: '#3a5a8a',
      skin: '#F5D5A8',
      hair: { style: 'fringe', color: '#E8E8E0' },
      glasses: 'rimless',
      eyeSpacing: 6,
    })),
  },
  {
    // Bald, deep skin, rectangular glasses, beanie
    id: 'kwame-asante',
    name: 'Kwame Asante',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#88A258',
      skin: '#6C564D',
      hair: { style: 'swept', color: '#1a1a1a' },
      glasses: 'rectangular',
    })),
  },
  {
    // Spiky pink hair, warm medium skin, sunglasses
    id: 'nova-sterling',
    name: 'Nova Sterling',
    role: 'Designer',
    src: svgUri(makeAvatar({
      bg: '#2a2a3a',
      skin: '#C08050',
      hair: { style: 'spiky', color: '#e63577' },
      glasses: 'sunglasses',
      eyeSpacing: 4,
    })),
  },
  {
    id: 'tariq-hassan',
    name: 'Tariq Hassan',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#2e6b9e',
      skin: '#C49A6C',
      hair: { style: 'swept', color: '#1a1a1a' },
      eyeSpacing: 6,
    })),
  },
  {
    id: 'ola-bergstrom',
    name: 'Ola Bergström',
    role: 'Researcher',
    src: svgUri(makeAvatar({
      bg: '#7a5c3a',
      skin: '#FFE0C8',
      hair: { style: 'bob', color: '#D4881A' },
      accessory: { type: 'headband', color: '#e05535' },
      eyeSpacing: 3.5,
    })),
  },
  {
    id: 'chen-wei',
    name: 'Chen Wei',
    role: 'Product Manager',
    src: svgUri(makeAvatar({
      bg: '#3a7a5c',
      skin: '#E8B88A',
      hair: { style: 'short', color: '#1a1a1a' },
      glasses: 'rimless',
      eyeSpacing: 5.5,
    })),
  },
  {
    id: 'imani-foster',
    name: 'Imani Foster',
    role: 'Designer',
    src: svgUri(makeAvatar({
      bg: '#58A2A0',
      skin: '#8B4A3A',
      hair: { style: 'fuzzy', color: '#5C2A10' },
      accessory: { type: 'cap', color: '#E3CD6B' },
    })),
  },
  {
    id: 'pascal-moreau',
    name: 'Pascal Moreau',
    role: 'Engineer',
    src: svgUri(makeAvatar({
      bg: '#4a3a7a',
      skin: '#FDDBB4',
      hair: { style: 'swept', color: '#8B4513' },
      glasses: 'round',
      eyeSpacing: 6.5,
    })),
  },
];

