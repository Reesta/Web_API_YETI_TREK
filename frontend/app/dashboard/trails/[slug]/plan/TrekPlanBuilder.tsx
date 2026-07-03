"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, CirclePlus, Clock3, X } from "lucide-react";
import { Stay } from "@/lib/api/stays";
import { Trail, TrailWaypoint } from "@/lib/api/trails";
import { resolveImageUrl } from "@/lib/api/image-url";

type ItineraryDay = {
  day: number;
  title: string;
  meta: string;
  text: string;
};

type SelectedLodge = {
  name: string;
  price: string;
  image: string;
};

export default function TrekPlanBuilder({
  trail,
  stays,
}: {
  trail: Trail;
  stays: Stay[];
}) {
  const itineraryDays = toItineraryDays(trail.waypoints);
  const [selected, setSelected] = useState<Record<number, SelectedLodge>>({});
  const [selectingDay, setSelectingDay] = useState<number | null>(null);
  const summary = itineraryDays
    .map((day) => ({ day, lodge: selected[day.day] }))
    .filter((item) => item.lodge);
  const total = summary.reduce((sum, item) => sum + parsePrice(item.lodge.price), 0);

  const chooseLodge = (stay: Stay) => {
    if (!selectingDay) return;
    setSelected((current) => ({
      ...current,
      [selectingDay]: {
        name: stay.name,
        price: stay.price,
        image: stay.image,
      },
    }));
    setSelectingDay(null);
  };

  return (
    <>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="relative grid gap-3 pl-8 before:absolute before:left-3 before:top-4 before:h-[calc(100%-20px)] before:w-px before:bg-white/10">
          {itineraryDays.length ? itineraryDays.map((day) => {
            const lodge = selected[day.day];

            return (
              <article
                key={day.day}
                className={`relative rounded-lg border border-white/5 bg-[#1f2221] p-6 shadow-xl shadow-black/15 ${
                  day.day > 2 ? "opacity-90" : ""
                }`}
              >
                <span className="absolute -left-[43px] top-6 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#1f2221] text-xs font-black text-white">
                  {day.day}
                </span>

                <h2 className="text-2xl font-black text-white">
                  {day.title}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-[#aeb5b4]">
                  <Clock3 size={14} />
                  {day.meta}
                </p>
                <p className="mt-6 max-w-[690px] text-sm leading-7 text-[#aeb5b4]">
                  {day.text}
                </p>

                {lodge ? (
                  <button
                    type="button"
                    onClick={() => setSelectingDay(day.day)}
                    className="mt-5 flex w-full items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#202829] p-4 text-left transition hover:border-[#e9a127]/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-16 overflow-hidden rounded-md">
                        <Image
                          src={resolveImageUrl(lodge.image)}
                          alt={lodge.name}
                          fill
                          unoptimized
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">{lodge.name}</h3>
                        <p className="mt-1 text-xs text-[#aeb5b4]">{lodge.price}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-[#aeb5b4]">
                      <CheckCircle2 size={18} className="text-emerald-300" />
                      Change
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectingDay(day.day)}
                    className="mt-5 flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-white/15 text-[11px] font-black tracking-wider text-[#aeb5b4] transition hover:border-[#e9a127] hover:text-[#e9a127]"
                  >
                    <CirclePlus size={18} className="mr-2 text-[#aeb5b4]" />
                    Select Lodge for {getDestination(day.title)}
                  </button>
                )}
              </article>
            );
          }) : (
            <div className="rounded-lg border border-white/10 bg-[#1f2221] p-8 text-[#aeb5b4]">
              No itinerary waypoints have been added for this trail yet.
            </div>
          )}
        </div>

        <aside className="sticky top-24 rounded-lg border border-[#e9a127]/50 border-t-[#e9a127] bg-[#1f2221] p-8 shadow-2xl shadow-black/25 max-lg:static">
          <h2 className="text-2xl font-light text-white">Trip Summary</h2>

          <p className="mt-8 text-[11px] font-black uppercase tracking-wider text-[#9aa4a3]">
            Lodge Summary
          </p>

          <div className="mt-5 grid gap-4">
            {summary.length ? summary.map(({ day, lodge }) => (
              <div key={day.day} className="grid grid-cols-[1fr_80px] gap-5 text-sm">
                <span className="text-[#c2c8c7]">
                  Day {day.day}: {lodge.name}
                </span>
                <span className="text-right text-white">{lodge.price}</span>
              </div>
            )) : (
              <p className="text-sm text-[#9aa4a3]">Select lodges to build your package.</p>
            )}
          </div>

          <div className="my-8 h-px bg-white/10" />

          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-white">Total</span>
            <strong className="text-2xl font-black text-[#e9a127]">
              NPR {total || 0}
            </strong>
          </div>

          <Link
            href={`/dashboard/trails/${trail.slug}/booking`}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-lg border-0 bg-[#e9a127] text-sm font-black text-[#121a18] shadow-xl shadow-[#e9a127]/20 transition hover:bg-[#f0b13d]"
          >
            Book selected Lodges
          </Link>
        </aside>
      </div>

      {selectingDay ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-[22px] border border-white/10 bg-[#0d1314] p-5 shadow-2xl shadow-black">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e9a127]">
                  Day {selectingDay}
                </p>
                <h2 className="mt-1 text-2xl font-black text-white">Select a lodge</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectingDay(null)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white"
                aria-label="Close lodge selector"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {stays.map((stay) => (
                <button
                  key={stay.id}
                  type="button"
                  onClick={() => chooseLodge(stay)}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#11191b] text-left transition hover:border-[#e9a127]/60"
                >
                  <div className="relative h-36">
                    <Image
                      src={resolveImageUrl(stay.image)}
                      alt={stay.name}
                      fill
                      unoptimized
                      sizes="360px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-black text-white">{stay.name}</h3>
                      <strong className="text-[#e9a127]">{stay.price}</strong>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#9aa4a3]">{stay.distance}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function getDestination(title: string) {
  return title.split("->").pop()?.trim() || "this stop";
}

function toItineraryDays(waypoints: TrailWaypoint[]): ItineraryDay[] {
  return waypoints.map((point, index) => ({
    day: index + 1,
    title: `${point.day}: ${point.title}`,
    meta: `Altitude ${point.altitude}`,
    text: point.text,
  }));
}

function parsePrice(price: string) {
  const value = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(value) ? value : 0;
}
