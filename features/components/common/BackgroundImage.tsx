"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

export default function BackgroundImage({
  src,
  alt = "Background",
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    setLoaded(true);
  };

  return createPortal(
    <div className={cn("absolute top-0 left-0 -z-10 h-full w-full", className)}>
      <Image
        ref={imageRef}
        src={src}
        width={1440}
        height={1024}
        quality={75}
        alt={alt}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAAJ9JREFUGFcVxT8LAXEcwOHPlx93F5noTqSkZKOUN6CMmLxZI7EYlLIY/BkQi3/Xxbn7yrM8Mur31KtVKVWKJI0hY9lcbw+W2xPTyQJxWx0dDro06xUaJY+b7zNb71ht9szHE8Rxy5or5Km3WzjPO2HS8EmlOR8vXHYHBDFqbIds3iVDzCv8EEXKOwgIAx8BUUmksCwbiWO+GqP/oy+g/ABbwT4tfM/HpQAAAABJRU5ErkJggg=="
        onLoad={handleLoad}
        priority
        className={cn(
          "absolute top-0 left-0 -z-10 w-full h-full object-cover",
          "transition-all duration-1000 ease-in-out",
          loaded ? "blur-0 opacity-100" : "opacity-50 blur-[120px]",
        )}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,1)_100%)]" />
    </div>,
    document.body,
  );
}
