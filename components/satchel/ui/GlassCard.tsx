"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type Variant = "default" | "red";

interface Props extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  hover?: boolean;
  className?: string;
}

export default function GlassCard({
  children,
  variant = "default",
  delay = 0,
  hover = false,
  className = "",
  ...rest
}: Props) {
  const base = variant === "red" ? "glass-card-red" : "glass-card";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover
          ? { y: -2, boxShadow: "0 16px 48px -12px rgba(255,70,85,0.25)" }
          : undefined
      }
      className={`${base} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
