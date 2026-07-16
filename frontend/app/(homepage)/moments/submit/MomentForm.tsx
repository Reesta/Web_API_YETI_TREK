"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { createMomentAction } from "@/lib/actions/moment-action";

export default function MomentForm({ cancelHref = "/#moments" }: { cancelHref?: string }) {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();
  return <form className="grid gap-5 rounded-3xl border border-white/10 bg-[#101822] p-7" onSubmit={(event) => {
    event.preventDefault(); const form = event.currentTarget; setMessage("");
    startTransition(async () => { const result = await createMomentAction(new FormData(form)); setSuccess(result.success); setMessage(result.message); if (result.success) form.reset(); });
  }}>
    <label className="grid gap-2 text-sm font-bold">Title<input required name="title" minLength={3} maxLength={120} className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 outline-none" /></label>
    <label className="grid gap-2 text-sm font-bold">Caption<textarea required name="caption" minLength={3} maxLength={1000} rows={5} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-bold">Location<input required name="location" className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 outline-none" /></label>
      <label className="grid gap-2 text-sm font-bold">Trail slug (optional)<input name="trailSlug" className="h-12 rounded-xl border border-white/10 bg-white/5 px-4 outline-none" /></label>
    </div>
    <label className="grid gap-2 text-sm font-bold">Moment image<input required name="image" type="file" accept="image/*" className="rounded-xl border border-dashed border-white/20 bg-white/5 p-4" /></label>
    {message && <p className={`rounded-xl p-3 text-sm ${success ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-300"}`}>{message}</p>}
    <div className="flex gap-3"><button disabled={pending} className="rounded-full bg-[#D89A2B] px-6 py-3 font-black text-black disabled:opacity-60">{pending ? "Submitting..." : "Submit for approval"}</button><Link href={cancelHref} className="rounded-full border border-white/15 px-6 py-3 font-bold">Cancel</Link></div>
  </form>;
}
