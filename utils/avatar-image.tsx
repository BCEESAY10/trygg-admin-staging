import { useState } from 'react';

import Image, { type ImageProps } from 'next/image';

interface AvatarImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
}

const AvatarImage = ({
  src,
  alt = 'Avatar',
  width = 32,
  height = 32,
  fallbackSrc = '/fallback-avatar.png',
  className,
  style,
  ...rest
}: AvatarImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return (
    <div>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        onError={() => setImgSrc(fallbackSrc)}
        {...rest}
      />
    </div>
  );
};

export default AvatarImage;
