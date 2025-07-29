"use client";
import { useState } from "react";

interface ErrorHandling {
  error: string | null;
  setError: (message: string) => void;
  clearError: () => void;
}

export const useErrorHandling = (): ErrorHandling => {
  const [error, setErrorState] = useState<string | null>(null);

  const setError = (message: string) => {
    setErrorState(message);
  };

  const clearError = () => {
    setErrorState(null);
  };

  return {
    error,
    setError,
    clearError,
  };
};
