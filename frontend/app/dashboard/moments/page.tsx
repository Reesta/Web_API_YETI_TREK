import Image from "next/image";
import Link from "next/link";
import { MapPin, Plus } from "lucide-react";
import MomentForm from "@/app/(homepage)/moments/submit/MomentForm";
import { getMomentsAction } from "@/lib/actions/moment-action";
import { Moment } from "@/lib/api/moments";
import { resolveImageUrl } from "@/lib/api/image-url";

export default async function DashboardMomentsPage({
  searchParams,
}: {
  searchParams: Promise<{ submit?: string }>;
}) {
  const { submit } = await searchParams;
  const showingForm = submit === "1";
  const result = await getMomentsAction();
  const moments: Moment[] = result.success && result.data ? result.data : [];

  return (
    <section className="mx-auto max-w-7xl text-white">
      <div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#e0a12b]">
            Community
          </p>
          <h1 className="mt-3 text-3xl font-black">
            {showingForm ? "Share a Trek Moment" : "Trek Moments"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#a9b5c4]">
            {showingForm
              ? "Upload a memory from your trek. It will appear after an administrator approves it."
              : "Browse approved experiences shared by trekkers."}
          </p>
        </div>
      </div>

      {showingForm ? (
        <div className="mx-auto mt-8 max-w-3xl">
          <MomentForm cancelHref="/dashboard/moments" />
        </div>
      ) : (
      <>
      <div className="mt-5 flex justify-end">
        <Link
          href="/dashboard/moments?submit=1"
          aria-label="Share a Trek Moment"
          title="Share a Trek Moment"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e0a12b] text-black transition hover:bg-[#f0b43b]"
        >
          <Plus size={23} strokeWidth={3} />
        </Link>
      </div>
      <div className="mt-3 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {moments.length ? (
          moments.map((moment) => (
            <article
              key={moment.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#101822]"
            >
              <div className="relative h-56">
                <Image
                  src={resolveImageUrl(moment.image)}
                  alt={moment.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#e0a12b]">
                  <MapPin size={14} />
                  {moment.location}
                </p>
                <h2 className="mt-3 text-xl font-black">{moment.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#a9b5c4]">
                  {moment.caption}
                </p>
                <p className="mt-4 text-xs text-slate-500">
                  Shared by {moment.uploadedBy.fullName}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#101822] p-8 text-[#a9b5c4] md:col-span-2 xl:col-span-3">
            Approved Trek Moments will appear here.
          </div>
        )}
      </div>
      </>
      )}
    </section>
  );
}
