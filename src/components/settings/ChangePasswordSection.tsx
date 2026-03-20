"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Save,
  ShieldX,
} from "lucide-react";
import { changePassword } from "@/actions/auth";

// ─── Password Input Field ──────────────────────────

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  placeholder: string;
  minLength?: number;
  hint?: string;
}

function PasswordInput({
  label,
  value,
  onChange,
  disabled,
  placeholder,
  minLength,
  hint,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">
        {label}
        <span className="text-destructive">*</span>
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 border-input"
          required
          disabled={disabled}
          minLength={minLength}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {hint && (
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      )}
    </div>
  );
}

// ─── Change Password Section ───────────────────────

interface ChangePasswordSectionProps {
  isGoogleUser: boolean;
}

export function ChangePasswordSection({
  isGoogleUser,
}: ChangePasswordSectionProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (isGoogleUser) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShieldX className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Password Change Not Available
          </h3>
          <p className="text-muted-foreground max-w-sm">
            You signed in with Google, so you can only use Google to access your
            account. Password management is handled by Google.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    startTransition(async () => {
      const result = await changePassword(currentPassword, newPassword);

      if (result.success) {
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Failed to change password");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Success message */}
      {success && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-700 font-medium">
            Password changed successfully!
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordInput
          label="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
          disabled={isPending}
          placeholder="Enter your current password"
        />
        <PasswordInput
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          disabled={isPending}
          placeholder="Enter your new password"
          minLength={8}
          hint="Must be at least 8 characters"
        />
        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          disabled={isPending}
          placeholder="Confirm your new password"
          minLength={8}
        />

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            <Save className="h-4 w-4 mr-2" />
            {isPending ? "Changing..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
