"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToastState } from "@/hooks/settings/types";

// ─── Toast Reader (reads URL params) ───────────────

function ToastReader({
  onToast,
}: {
  onToast: (type: "success" | "error", message: string) => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success") {
      onToast("success", "Profile updated successfully!");
      router.replace("/user/settings", { scroll: false });
    } else if (status === "error") {
      const errorMsg =
        searchParams.get("message") || "Failed to update profile";
      onToast("error", errorMsg);
      router.replace("/user/settings", { scroll: false });
    }
  }, [searchParams, router, onToast]);

  return null;
}

// ─── Toast Notification ────────────────────────────

interface ToastNotificationProps {
  toast: ToastState;
  onToast: (type: "success" | "error", message: string) => void;
}

export function ToastNotification({ toast, onToast }: ToastNotificationProps) {
  return (
    <>
      {/* URL-param reader wrapped in Suspense */}
      <Suspense fallback={null}>
        <ToastReader onToast={onToast} />
      </Suspense>

      {/* Visible toast */}
      {toast.show && (
        <div
          className={cn(
            "fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300",
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white",
          )}
        >
          {toast.type === "success" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </>
  );
}
