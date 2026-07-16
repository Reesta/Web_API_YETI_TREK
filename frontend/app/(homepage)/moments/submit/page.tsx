import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/lib/actions/auth-action";
import MomentForm from "./MomentForm";

export default async function SubmitMomentPage() {
  const user = await getCurrentUserAction();
  if (!user.success || !user.data) redirect("/login");
  return <main className="min-h-screen bg-[#070b13] px-5 pb-24 pt-32 text-white"><div className="mx-auto max-w-3xl"><p className="text-xs font-black uppercase tracking-[.25em] text-[#D89A2B]">Community</p><h1 className="mt-3 text-4xl font-black">Share a Trek Moment</h1><p className="mb-8 mt-3 text-slate-400">Your moment will appear publicly after an administrator approves it.</p><MomentForm /></div></main>;
}
