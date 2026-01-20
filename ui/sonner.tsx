"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      richColors
      icons={{
        success: <CircleCheckIcon className="size-6" />,
        info: <InfoIcon className="size-6" />,
        warning: <TriangleAlertIcon className="size-6" />,
        error: <OctagonXIcon className="size-6" />,
        loading: <Loader2Icon className="size-6 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          title: "text-lg !leading-[20px] pl-2",
          description: "text-md  pl-2",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",

          "--success-bg": "var(--primary)",
          "--success-text": "var(--primary-foreground)",
          "--success-border": "var(--primary-dark)",

          "--error-bg": "var(--destructive)",
          "--error-text": "var(--destructive-foreground)",
          "--error-border": "var(--destructive-dark)",

          "--warning-bg": "var(--destructive-dark)",
          "--warning-text": "var(--destructive-foreground)",
          "--warning-border": "var(--destructive)",

          "--info-bg": "var(--secondary)",
          "--info-text": "var(--secondary-foreground)",
          "--info-border": "var(--border)",

          "--border-radius": "var(--radius)",
          "--font-size": "16px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
