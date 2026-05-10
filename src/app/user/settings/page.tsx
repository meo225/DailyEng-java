import { getUserProfile } from "@/actions/user";
import SettingsPageClient from "@/components/page/SettingsPageClient";

// Force dynamic rendering because this page uses auth headers
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { user, isGoogleUser } = await getUserProfile();

  // Format date for display (DD/MM/YYYY)
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // If user fetch fails on server (common on Vercel due to cookie headers), 
  // we don't redirect here. We let the client-side <ProtectedRoute> handle it.
  // This prevents sudden logouts during navigation.
  const initialFormData = {
    name: user?.name || "",
    email: user?.email || "",
    dateOfBirth: user ? formatDate(user.dateOfBirth) : "",
    phoneNumber: user?.phoneNumber || "",
    gender: user?.gender || "",
    address: user?.address || "",
    level: user?.level || "",
  };

  return (
    <SettingsPageClient
      initialFormData={initialFormData}
      isGoogleUser={isGoogleUser}
      userImage={user?.image || null}
    />
  );
}
