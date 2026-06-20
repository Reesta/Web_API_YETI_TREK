import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import { getCurrentUserAction } from "@/lib/actions/auth-action";
import DashboardNav from "./_components/DashboardNav";
import LogoutButton from "./_components/LogoutButton";
import ProfileImage from "./_components/ProfileImage";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await getCurrentUserAction();

  if (!response?.success || !response.data) {
    redirect("/login");
  }

  const user = response.data;

  return (
    <AuthProvider initialUser={user}>
      <div className="yt-dashboard-shell">
        <aside className="yt-sidebar">
          <div>
            <Link href="/dashboard" className="yt-sidebar-title">
              Dashboard
            </Link>

            <div className="yt-sidebar-user">
              <ProfileImage user={user} size="small" />
              <div>
                <p>{user.fullName}</p>
                <span>{user.email}</span>
              </div>
            </div>

            <DashboardNav />
          </div>

          <LogoutButton />
        </aside>

        <section className="yt-main-panel">
          <header className="yt-topbar">
            <div>
              <p>Yeti Trek</p>
              <span>Ready for your next adventure?</span>
            </div>
            <ProfileImage user={user} size="small" />
          </header>

          <main className="yt-dashboard-content">{children}</main>
        </section>
      </div>
    </AuthProvider>
  );
}
