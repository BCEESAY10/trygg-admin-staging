import { useState } from 'react';

import Image from 'next/image';

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallback?: string;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  fallback = '/user-placeholder.avif',
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src ?? fallback);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'cover', borderRadius: '50%' }}
      onError={() => setImgSrc(fallback)}
    />
  );
}

export function DriverImage({
  src,
  alt,
  width,
  height,
  className,
  fallback = '/car.webp',
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src ?? fallback);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'cover', borderRadius: '50%' }}
      onError={() => setImgSrc(fallback)}
    />
  );
}

export function FormattedImage({
  src,
  alt,
  width,
  height,
  className,
  fallback,
}: SafeImageProps & { fallback?: string }) {
  const [imgSrc, setImgSrc] = useState(src ?? null);
  const [hasError, setHasError] = useState(false);

  const getInitials = () => {
    if (fallback) return fallback;

    const names = alt.split(' ').filter(Boolean);
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0]?.[0]?.toUpperCase() || '?';
  };

  if (!imgSrc || hasError) {
    return (
      <div
        className={className}
        style={{
          width,
          height,
          borderRadius: '50%',
          backgroundColor: '#ffc107',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: typeof width === 'number' ? width * 0.4 : '1rem',
          fontWeight: 600,
          color: '#fff',
        }}
      >
        {getInitials()}
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'cover', borderRadius: '50%' }}
      onError={() => {
        setImgSrc(null);
        setHasError(true);
      }}
    />
  );
}
