"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Mail, Phone, UserRound, Users } from "lucide-react";
import BookingForm from "../../../_components/BookingForm";
import { Stay } from "@/lib/api/stays";
import { Trail } from "@/lib/api/trails";

type LodgeItem = {
  day: string;
  destination: string;
  stay?: Stay;
};

export default function TrailBookingClient({
  trail,
  packageLodges,
  baseTotal,
}: {
  trail: Trail;
  packageLodges: LodgeItem[];
  baseTotal: number;
}) {
  const [travelers, setTravelers] = useState(2);
  const total = baseTotal * travelers;
  const amount = total ? `NPR ${total}` : "NPR 0";

  return (
    <section className="grid gap-7">
      <Link
        href={`/dashboard/trails/${trail.slug}/plan`}
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#e9a127] transition hover:text-[#f0b13d]"
      >
        <ArrowLeft size={16} />
        Back to Plan
      </Link>

      <div>
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#e9a127]">
          Trek Lodge Booking
        </p>
        <h1 className="mt-2 text-[34px] font-black leading-tight text-white">
          Book lodges for {trail.title}
        </h1>
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_330px]">
        <BookingForm
          submitLabel="Confirm Trek Booking"
          booking={{
            itemType: "trail",
            itemId: trail.id,
            itemSlug: trail.slug,
            itemTitle: trail.title,
            amount,
            location: trail.distance,
          }}
          defaultTravelers={travelers}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="fullName" icon={<UserRound size={16} />} label="Lead Traveler" placeholder="Your name" />
            <Field name="email" icon={<Mail size={16} />} label="Email" placeholder="you@example.com" />
            <Field name="phone" icon={<Phone size={16} />} label="Phone" placeholder="+977 98XXXXXXXX" />
            <Field name="startDate" icon={<CalendarDays size={16} />} label="Start Date" type="date" />
            <Field
              name="travelers"
              icon={<Users size={16} />}
              label="Travelers"
              type="number"
              value={travelers}
              onChange={(value) => setTravelers(Math.max(1, value))}
            />
            <Field name="pickupCity" label="Pickup City" placeholder="Kathmandu" />
          </div>

          <div className="rounded-xl border border-white/10 bg-[#11191b] p-5">
            <h2 className="text-base font-black text-white">Selected Lodges</h2>
            <div className="mt-4 grid gap-3">
              {packageLodges.length ? packageLodges.map((item) => (
                <div
                  key={`${item.day}-${item.destination}`}
                  className="flex items-center justify-between gap-4 rounded-lg bg-[#0d1314] px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-white">
                    {item.day}: {item.stay?.name || `Select Lodge for ${item.destination}`}
                  </span>
                  <span className="text-[#9aa4a3]">{item.stay?.price ?? "Select on arrival"}</span>
                </div>
              )) : (
                <p className="text-sm text-[#9aa4a3]">
                  No backend waypoints found for this trail.
                </p>
              )}
            </div>
          </div>
        </BookingForm>

        <aside className="rounded-[18px] border border-white/10 bg-[#0d1314] p-6 shadow-2xl shadow-black/25">
          <h2 className="text-xl font-black text-white">Trip Summary</h2>
          <p className="mt-2 text-sm text-[#9aa4a3]">
            {trail.detailDuration} trek package lodge estimate.
          </p>

          <div className="mt-6 grid gap-4">
            {packageLodges.length ? packageLodges.map((item) => (
              <div key={`${item.day}-summary`} className="grid grid-cols-[1fr_80px] gap-4 text-sm">
                <span className="text-[#c2c8c7]">
                  {item.day}: {item.stay?.name || item.destination}
                </span>
                <span className="text-right text-white">{item.stay?.price ?? "-"}</span>
              </div>
            )) : (
              <p className="text-sm text-[#9aa4a3]">No lodges selected.</p>
            )}
          </div>

          <div className="my-6 h-px bg-white/10" />

          <div className="flex items-center justify-between text-sm text-[#9aa4a3]">
            <span>Package</span>
            <span>NPR {baseTotal}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-[#9aa4a3]">
            <span>Travelers</span>
            <span>x {travelers}</span>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xl font-black text-white">Total</span>
            <strong className="text-2xl font-black text-[#e9a127]">
              {amount}
            </strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  name,
  icon,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  name: string;
  icon?: React.ReactNode;
  label: string;
  placeholder?: string;
  type?: string;
  value?: number;
  onChange?: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-white">
      {label}
      <span className="flex h-12 items-center gap-3 rounded-lg border border-white/10 bg-[#11191b] px-4 transition focus-within:border-[#e9a127]">
        {icon ? <span className="text-[#e9a127]">{icon}</span> : null}
        <input
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange?.(Number(event.target.value) || 1)}
          placeholder={placeholder}
          min={type === "number" ? 1 : undefined}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-[#687271]"
        />
      </span>
    </label>
  );
}
