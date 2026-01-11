"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className={cn("absolute top-0 left-0 -z-10 h-full w-full", className)}>
      <Image
        className="h-full w-full object-cover"
        src={src}
        alt={alt}
        width={1440}
        height={1024}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,1)_100%)]" />
    </div>,
    document.body
  );
}
