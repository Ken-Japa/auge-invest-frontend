import { useState, useEffect } from "react";
("use client");

/**
 * Utilitários para lidar com problemas de SSR
 * Este arquivo ajuda a resolver problemas de "self is not defined" e outras questões de SSR
 */

export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

/**
 * Hook para verificar se estamos no cliente (browser)
 */
export const useIsClient = () => {
  if (typeof window === "undefined") return false;
  return true;
};

/**
 * Component wrapper que só renderiza no cliente
 */
export const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === "undefined") {
    return null;
  }
  return children;
};

/**
 * Hook para imports dinâmicos seguros para SSR
 */
export const useSafeImport = <T>(
  importFunction: () => Promise<T>,
  fallback: T | null = null
): T | null => {
  const [module, setModule] = useState<T | null>(fallback);

  useEffect(() => {
    if (typeof window !== "undefined") {
      importFunction().then(setModule).catch(console.error);
    }
  }, [importFunction]);

  return module;
};

/**
 * Polyfills para variáveis globais do browser que podem não existir no servidor
 */
if (typeof window === "undefined") {
  // @ts-ignore
  global.self = global;
  // @ts-ignore
  global.window = global;
  // @ts-ignore
  global.document = {};
  // @ts-ignore
  global.navigator = { userAgent: "" };
}
