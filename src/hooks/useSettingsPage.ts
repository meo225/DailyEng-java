"use client";

import { useState } from "react";
import { useSettingsForm } from "./settings/useSettingsForm";
import { useAvatarUpload } from "./settings/useAvatarUpload";
import { useToast } from "./settings/useToast";
import type { TabType, SettingsFormData } from "./settings/types";

// Re-export types for downstream consumers
export type { SettingsFormData, TabType, ToastState } from "./settings/types";
export {
  LEVEL_DISPLAY_MAP,
  SETTINGS_TABS,
  parseDate,
  formatDate,
} from "./settings/types";

// ─── Composer Hook ─────────────────────────────────

interface UseSettingsPageParams {
  initialFormData: SettingsFormData;
  isGoogleUser: boolean;
  userImage: string | null;
}

export function useSettingsPage({
  initialFormData,
  isGoogleUser,
  userImage,
}: UseSettingsPageParams) {
  const [activeTab, setActiveTab] = useState<TabType>("personal");

  const { toast, showToast } = useToast();

  const form = useSettingsForm({
    initialFormData,
    isGoogleUser,
    onSuccess: () => {
      window.location.href = "/user/settings?status=success";
    },
    onError: (message) => showToast("error", message),
  });

  const avatar = useAvatarUpload({
    initialImage: userImage,
    onSuccess: (message) => showToast("success", message),
    onError: (message) => showToast("error", message),
  });

  return {
    activeTab,
    setActiveTab,
    toast,
    showToast,
    ...form,
    ...avatar,
    isGoogleUser,
  };
}
