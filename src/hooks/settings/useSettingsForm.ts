"use client";

import { useState, useTransition } from "react";
import { updateUserProfile } from "@/actions/user";
import { Level } from "@prisma/client";
import type { SettingsFormData } from "./types";
import { parseDate, formatDate } from "./types";

interface UseSettingsFormParams {
  initialFormData: SettingsFormData;
  isGoogleUser: boolean;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export function useSettingsForm({
  initialFormData,
  isGoogleUser,
  onSuccess,
  onError,
}: UseSettingsFormParams) {
  const [formData, setFormData] = useState<SettingsFormData>(initialFormData);
  const [originalData] = useState<SettingsFormData>(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // ── Field helpers ──

  const hasFieldChanged = (field: keyof SettingsFormData) =>
    formData[field] !== originalData[field];

  const resetField = (field: keyof SettingsFormData) => {
    setFormData((prev) => ({ ...prev, [field]: originalData[field] }));
  };

  const updateField = (field: keyof SettingsFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ── Actions ──

  const handleEditClick = () => {
    setIsEditing(true);
    setErrorMessage("");
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
    setErrorMessage("");
  };

  const handleSave = () => {
    startTransition(async () => {
      // Email validation for non-Google users
      if (!isGoogleUser && formData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setErrorMessage("Invalid email format");
          return;
        }
      }

      const dateOfBirth = parseDate(formData.dateOfBirth);

      const result = await updateUserProfile({
        name: formData.name || undefined,
        email: isGoogleUser ? undefined : formData.email,
        phoneNumber: formData.phoneNumber || undefined,
        dateOfBirth,
        gender: formData.gender || undefined,
        address: formData.address || undefined,
        level: (formData.level as Level) || undefined,
      });

      if (result.success) {
        onSuccess();
      } else {
        const message = result.error || "Failed to update profile";
        setErrorMessage(message);
        onError(message);
      }
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: formatDate(date) }));
      setDatePickerOpen(false);
    }
  };

  // ── Derived values ──
  const displayName = originalData.name || "User";

  return {
    formData,
    originalData,
    isEditing,
    errorMessage,
    isPending,
    datePickerOpen,
    setDatePickerOpen,
    displayName,
    hasFieldChanged,
    resetField,
    updateField,
    handleEditClick,
    handleCancel,
    handleSave,
    handleDateSelect,
  };
}
