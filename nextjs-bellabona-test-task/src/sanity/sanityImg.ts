import type { CSSProperties } from 'react';

interface SanityImageHotspot {
  x?: number | null;
  y?: number | null;
  width?: number | null;
  height?: number | null;
}

interface SanityImageCrop {
  top?: number | null;
  bottom?: number | null;
  left?: number | null;
  right?: number | null;
}

export interface SanityImageLike {
  asset?: { url?: string | null } | null;
  hotspot?: SanityImageHotspot | null;
  crop?: SanityImageCrop | null;
}

const DEFAULT_QUALITY = 82;

const dimsFromUrl = (url: string): { w: number; h: number } | null => {
  const match = url.match(/-(\d+)x(\d+)\.[a-z]+(?:\?|$)/i);
  if (!match) return null;
  return { w: Number(match[1]), h: Number(match[2]) };
};

export function urlFor(
  image: SanityImageLike | null | undefined,
  width?: number,
  quality = DEFAULT_QUALITY,
): string {
  const url = image?.asset?.url;
  if (!url) return '';

  const params = new URLSearchParams();
  if (width) params.set('w', String(width));
  params.set('q', String(quality));
  params.set('auto', 'format');

  const crop = image?.crop;
  if (crop) {
    const dims = dimsFromUrl(url);
    if (dims) {
      const left = crop.left ?? 0;
      const right = crop.right ?? 0;
      const top = crop.top ?? 0;
      const bottom = crop.bottom ?? 0;
      const cropX = Math.round(left * dims.w);
      const cropY = Math.round(top * dims.h);
      const cropW = Math.round((1 - left - right) * dims.w);
      const cropH = Math.round((1 - top - bottom) * dims.h);
      if (cropW > 0 && cropH > 0) {
        params.set('rect', `${cropX},${cropY},${cropW},${cropH}`);
      }
    }
  }

  return `${url}?${params.toString()}`;
}

export function getObjectPosition(image: SanityImageLike | null | undefined): string | undefined {
  const hotspot = image?.hotspot;
  if (!hotspot) return undefined;

  let x = hotspot.x ?? 0.5;
  let y = hotspot.y ?? 0.5;

  const crop = image?.crop;
  if (crop) {
    const left = crop.left ?? 0;
    const right = crop.right ?? 0;
    const top = crop.top ?? 0;
    const bottom = crop.bottom ?? 0;
    const cropW = 1 - left - right;
    const cropH = 1 - top - bottom;
    if (cropW > 0) x = (x - left) / cropW;
    if (cropH > 0) y = (y - top) / cropH;
  }

  x = Math.max(0, Math.min(1, x));
  y = Math.max(0, Math.min(1, y));
  return `${x * 100}% ${y * 100}%`;
}

export function getImageProps(
  image: SanityImageLike | null | undefined,
  width?: number,
  quality?: number,
): { src: string; style: CSSProperties | undefined } {
  const objectPosition = getObjectPosition(image);
  return {
    src: urlFor(image, width, quality),
    style: objectPosition ? { objectPosition } : undefined,
  };
}

export function optimizeUrl(
  url: string | undefined | null,
  width?: number,
  quality = DEFAULT_QUALITY,
): string {
  if (!url) return '';
  const params = new URLSearchParams();
  if (width) params.set('w', String(width));
  params.set('q', String(quality));
  params.set('auto', 'format');
  return `${url}?${params.toString()}`;
}
