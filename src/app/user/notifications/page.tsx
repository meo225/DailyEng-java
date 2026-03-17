import { redirect } from "next/navigation";
import NotificationsPageClient from "@/components/page/NotificationsPageClient";

export default function NotificationsPage() {
  // In cross-origin cookie mode, server-side auth() can't read cookies.
  // The NotificationsPageClient will fetch notifications client-side
  // using userId from useAuth().
  return (
    <NotificationsPageClient
      notifications={[]}
      totalPages={1}
      currentPage={1}
      unreadCount={0}
      userName="User"
      userId=""
    />
  );
}
