interface ImgHandlerProps {
  src: string | undefined;
  alt?: string;
  fallbackSrc: string;
  className?: string;
  onLoad?: () => void;
}

export function ImgHandler({ src, alt, fallbackSrc, className, onLoad }: ImgHandlerProps) {
  const effectiveSrc = src || fallbackSrc;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = e.currentTarget;
    imgElement.onerror = null;
    imgElement.src = fallbackSrc;
  };

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}
