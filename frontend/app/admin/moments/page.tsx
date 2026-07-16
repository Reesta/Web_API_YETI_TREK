import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserAction } from "@/lib/actions/auth-action";
import { getAdminMomentsAction } from "@/lib/actions/admin/admin-moment-action";
import MomentTable from "./MomentTable";

export default async function AdminMomentsPage() {
  const user = await getCurrentUserAction(); if (!user.success || !user.data) redirect("/admin/login"); if (user.data.role !== "admin") redirect("/dashboard");
  const result = await getAdminMomentsAction();
  return <main className="min-h-screen bg-[#080d16] px-5 py-12 text-white"><div className="mx-auto max-w-7xl"><Link href="/admin/dashboard" className="text-sm text-[#D89A2B]">← Admin dashboard</Link><h1 className="mt-4 text-4xl font-black">Trek Moments moderation</h1><p className="mb-8 mt-2 text-slate-400">Approve user submissions before they appear on the homepage, or edit, reject, and delete them.</p><MomentTable initial={result.success && result.data ? result.data : []} /></div></main>;
}
