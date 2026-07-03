import { notFound } from "next/navigation";
import { getTrailBySlugAction } from "@/lib/actions/trail-action";
import { Trail } from "@/lib/api/trails";
import { getStaysAction } from "@/lib/actions/stay-action";
import { Stay } from "@/lib/api/stays";
import TrekPlanBuilder from "./TrekPlanBuilder";

export default async function TrekPlanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getTrailBySlugAction(slug);
  const trail = result.success ? (result.data as Trail | null) : null;
  const staysResult = await getStaysAction();
  const stays: Stay[] = staysResult.success && staysResult.data ? staysResult.data : [];

  if (!trail) {
    notFound();
  }

  return (
    <section className="grid gap-7">
      <div>
        <p className="text-[13px] font-black uppercase tracking-[0.12em] text-[#e9a127]">
          {trail.title}
        </p>
        <h1 className="mt-1 text-[32px] font-black leading-tight text-white">
          Interactive Itinerary
        </h1>
      </div>

      <TrekPlanBuilder trail={trail} stays={stays} />
    </section>
  );
}
