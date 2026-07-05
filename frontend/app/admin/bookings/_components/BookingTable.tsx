"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteAdminBookingAction } from "@/lib/actions/admin/admin-booking-action";
import { AdminBooking, BookingListMeta } from "@/lib/api/admin/admin-bookings";

export default function BookingTable({
  data,
  meta,
  search,
}: {
  data: AdminBooking[];
  meta: BookingListMeta;
  search: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [target, setTarget] = useState<AdminBooking | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const firstRow = meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1;
  const lastRow = Math.min(meta.page * meta.limit, meta.total);

  const setQuery = (next: Record<string, string | number>) => {
    const query = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([key, value]) => query.set(key, String(value)));
    router.push(`/admin/bookings?${query.toString()}`);
  };

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery({
      search: String(new FormData(event.currentTarget).get("search") || ""),
      page: 1,
    });
  };

  const removeBooking = () => {
    if (!target) return;
    setError("");
    startTransition(async () => {
      const result = await deleteAdminBookingAction(target.id);
      if (!result.success) {
        setError(result.message);
        return;
      }
      setTarget(null);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-[#e9a127]">
          Admin workspace
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Booking History
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
          Review trail and stay bookings submitted by users.
        </p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-[#0d1422]/90 p-4 shadow-2xl shadow-black/30 sm:p-5">
        <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by traveler, email, or booking title..."
            className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#e9a127]/70"
          />
          <button className="h-12 rounded-2xl border border-white/10 bg-white/[0.07] px-6 text-sm font-black text-slate-100">
            Search
          </button>
        </form>
        {error && (
          <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        )}

        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08101c]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-slate-400">
                <tr>
                  <th className="px-5 py-4">Booking</th>
                  <th className="px-5 py-4">Traveler</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.length ? data.map((booking) => (
                  <tr key={booking.id} className="transition hover:bg-white/[0.035]">
                    <td className="px-5 py-5">
                      <span className="rounded-full bg-[#e9a127]/15 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#e9a127]">
                        {booking.itemType === "trail" ? "Trail" : "Stay"}
                      </span>
                      <p className="mt-3 font-black text-white">{booking.itemTitle}</p>
                      <p className="mt-1 text-xs text-slate-500">{booking.location || booking.itemSlug}</p>
                    </td>
                    <td className="px-5 py-5">
                      <p className="font-semibold text-white">{booking.fullName}</p>
                      <p className="mt-1 text-xs text-slate-500">{booking.email}</p>
                      <p className="mt-1 text-xs text-slate-500">{booking.phone}</p>
                    </td>
                    <td className="px-5 py-5 text-slate-300">
                      {formatDate(booking.startDate)}
                    </td>
                    <td className="px-5 py-5 font-black text-[#e9a127]">{booking.amount}</td>
                    <td className="px-5 py-5">
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-200">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/bookings/${booking.id}`}
                          className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-[#e9a127]/50 hover:text-[#e9a127]"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/bookings/${booking.id}/edit`}
                          className="rounded-xl border border-white/10 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-[#e9a127]/50 hover:text-[#e9a127]"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setTarget(booking)}
                          className="rounded-xl border border-red-300/20 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-400/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-slate-400">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing <strong className="text-slate-200">{firstRow}</strong>-
            <strong className="text-slate-200">{lastRow}</strong> of{" "}
            <strong className="text-slate-200">{meta.total}</strong> bookings
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={meta.page <= 1}
              onClick={() => setQuery({ page: meta.page - 1 })}
              className="rounded-2xl border border-white/10 px-4 py-2.5 font-bold text-slate-200 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="rounded-2xl bg-white/[0.06] px-4 py-2.5 font-black text-white">
              {meta.page} / {Math.max(meta.totalPages, 1)}
            </span>
            <button
              disabled={meta.page >= meta.totalPages}
              onClick={() => setQuery({ page: meta.page + 1 })}
              className="rounded-2xl border border-white/10 px-4 py-2.5 font-bold text-slate-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {target && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0d1422] p-6 shadow-2xl shadow-black">
            <h2 className="text-2xl font-black text-white">Delete this booking?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              You are about to delete the booking for{" "}
              <strong className="text-white">{target.fullName}</strong> on{" "}
              <strong className="text-white">{target.itemTitle}</strong>.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setTarget(null)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={removeBooking}
                disabled={isPending}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-black text-white disabled:opacity-60"
              >
                {isPending ? "Deleting..." : "Delete booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(value: string) {
  if (!value) return "Date not set";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
