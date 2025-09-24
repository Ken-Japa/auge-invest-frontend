'use client';

import { AnimatePresence } from "framer-motion";

export default function DynamicAnimatePresence({ children }: { children: React.ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}