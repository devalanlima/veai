"use client";
import { motion, MotionProps } from "framer-motion";

interface AnimatedWrapperProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedWrapper({
  children,
  className,
  ...props
}: AnimatedWrapperProps) {
  return (
    <motion.div className={className} {...props}>
      {children}
    </motion.div>
  );
}
