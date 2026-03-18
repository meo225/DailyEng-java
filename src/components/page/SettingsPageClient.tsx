"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UserProfileSidebar } from "@/components/layout/user-profile-sidebar";
import { UserIcon } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useSettingsPage } from "@/hooks/useSettingsPage";
import { SettingsTabBar } from "@/components/settings/SettingsTabBar";
import { ToastNotification } from "@/components/settings/ToastNotification";
import { PersonalInfoForm } from "@/components/settings/PersonalInfoForm";
import { ChangePasswordSection } from "@/components/settings/ChangePasswordSection";
import type { SettingsFormData } from "@/hooks/settings/types";

// ─── Types ─────────────────────────────────────────

interface SettingsPageClientProps {
  initialFormData: SettingsFormData;
  isGoogleUser: boolean;
  userImage: string | null;
  showSuccessToast?: boolean;
}

// ─── Component ─────────────────────────────────────

export default function SettingsPageClient({
  initialFormData,
  isGoogleUser,
  userImage,
}: SettingsPageClientProps) {
  const {
    activeTab,
    setActiveTab,
    toast,
    showToast,
    displayName,
    avatarUrl,
    isUploadingAvatar,
    handleAvatarUpload,
    ...formProps
  } = useSettingsPage({ initialFormData, isGoogleUser, userImage });

  return (
    <ProtectedRoute
      pageName="Settings"
      pageDescription="View and manage your account settings and personal information."
      pageIcon={<UserIcon className="w-10 h-10 text-primary" />}
    >
      <ToastNotification toast={toast} onToast={showToast} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <UserProfileSidebar
              activePage="settings"
              userName={displayName}
              userImage={avatarUrl}
              onAvatarUpload={handleAvatarUpload}
              isUploadingAvatar={isUploadingAvatar}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            <Card className="border-border shadow-sm bg-white">
              <CardContent className="p-8">
                <SettingsTabBar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {activeTab === "personal" ? (
                  <PersonalInfoForm
                    {...formProps}
                    isGoogleUser={isGoogleUser}
                  />
                ) : (
                  <ChangePasswordSection isGoogleUser={isGoogleUser} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
