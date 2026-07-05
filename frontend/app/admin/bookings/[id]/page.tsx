import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAdminBookingAction } from "@/lib/actions/admin/admin-booking-action";
import { getCurrentUserAction } from "@/lib/actions/auth-action";

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentUser = await getCurrentUserAction();
  if (!currentUser.success || !currentUser.data) redirect("/admin/login");
  if (currentUser.data.role !== "admin") redirect("/dashboard");

  const { id } = await params;
  const result = await getAdminBookingAction(id);
  if (!result.success || !result.data) notFound();
  const booking = result.data;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060914] px-5 py-8 text-white sm:px-8 lg:py-10">
      <div className="absolute left-[-160px] top-[-160px] h-96 w-96 rounded-full bg-[#e9a127]/20 blur-3xl" />
      <div className="absolute bottom-[-180px] right-[-120px] h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl" />

      <section className="relative mx-auto max-w-5xl">
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-[#e9a127]/50 hover:text-[#e9a127]"
        >
          Back to bookings
        </Link>

        <div className="mt-6 overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur">
          <div className="border-b border-white/10 bg-gradient-to-br from-[#e9a127]/15 via-white/[0.03] to-cyan-400/10 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#e9a127]">
                  Booking details
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                  {booking.itemTitle}
                </h1>
                <p className="mt-3 text-sm text-slate-300">
                  Booked by {booking.fullName} for {booking.travelers} traveler
                  {booking.travelers === 1 ? "" : "s"}.
                </p>
              </div>
              <Link
                href={`/admin/bookings/${booking.id}/edit`}
                className="inline-flex justify-center rounded-2xl bg-[#e9a127] px-5 py-3 text-sm font-black text-[#14100a] shadow-lg shadow-[#e9a127]/20 transition hover:-translate-y-0.5 hover:bg-[#f5b94d]"
              >
                Edit booking
              </Link>
            </div>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 sm:p-8">
            <InfoCard label="Traveler" value={booking.fullName} />
            <InfoCard label="Email" value={booking.email} />
            <InfoCard label="Phone" value={booking.phone} />
            <InfoCard label="Status" value={booking.status} badge />
            <InfoCard label="Amount" value={booking.amount} accent />
            <InfoCard label="Travelers" value={String(booking.travelers)} />
            <InfoCard label="Start date" value={formatDate(booking.startDate)} />
            <InfoCard label="End date" value={booking.endDate ? formatDate(booking.endDate) : "Not set"} />
            <InfoCard label="Pickup city" value={booking.pickupCity || "Not set"} />
            <InfoCard label="Type" value={booking.itemType === "trail" ? "Trail" : "Stay"} />
            <InfoCard label="Location" value={booking.location || "Not set"} />
            <InfoCard label="Created" value={formatDateTime(booking.createdAt)} />
            <div className="rounded-3xl border border-white/10 bg-[#0d1422]/80 p-5 sm:col-span-2 lg:col-span-3">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Special request
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-200">
                {booking.specialRequest || "No special request added."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  label,
  value,
  badge,
  accent,
}: {
  label: string;
  value: string;
  badge?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d1422]/80 p-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
      {badge ? (
        <span className="mt-3 inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-200">
          {value}
        </span>
      ) : (
        <p className={`mt-3 font-bold ${accent ? "text-[#e9a127]" : "text-white"}`}>{value}</p>
      )}
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
