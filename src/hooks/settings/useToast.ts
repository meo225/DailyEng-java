"use client";

import { useState, useEffect, useCallback } from "react";
import type { ToastState } from "./types";

const TOAST_DURATION_MS = 2000;

const HIDDEN_TOAST: ToastState = { show: false, type: "success", message: "" };

export function useToast() {
  const [toast, setToast] = useState<ToastState>(HIDDEN_TOAST);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ show: true, type, message });
    },
    [],
  );

  // Auto-hide after duration
  useEffect(() => {
    if (!toast.show) return;
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast.show]);

  return { toast, showToast };
}
