"use client";

import { useState } from "react";
import { useUserProfile } from "@/contexts/UserProfileContext";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

interface UseAvatarUploadParams {
  initialImage: string | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function useAvatarUpload({
  initialImage,
  onSuccess,
  onError,
}: UseAvatarUploadParams) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialImage);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const { refreshProfile } = useUserProfile();

  const handleAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      onError("Invalid file type. Please use JPG, PNG, WebP or GIF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      onError("File too large. Maximum size is 5MB.");
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const base64 = await readFileAsBase64(file);

      const response = await fetch("/api/upload/avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mimeType: file.type }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAvatarUrl(data.url);
        await refreshProfile();
        onSuccess("Avatar updated successfully!");
      } else {
        onError(data.error || "Failed to upload avatar");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      onError("Failed to upload avatar");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return { avatarUrl, isUploadingAvatar, handleAvatarUpload };
}

// ─── Internal helpers ──────────────────────────────

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
