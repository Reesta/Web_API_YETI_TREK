import { notFound } from "next/navigation";
import { getTrailBySlugAction } from "@/lib/actions/trail-action";
import { Trail } from "@/lib/api/trails";
import { getStaysAction } from "@/lib/actions/stay-action";
import { Stay } from "@/lib/api/stays";
import TrailBookingClient from "./TrailBookingClient";

export default async function TrailBookingPage({
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

  const packageLodges = trail.waypoints.map((point, index) => ({
    day: point.day || `Day ${index + 1}`,
    destination: point.title,
    stay: stays[index],
  }));
  const total = packageLodges.reduce(
    (sum, item) => sum + parsePrice(item.stay?.price || ""),
    0,
  );
  return <TrailBookingClient trail={trail} packageLodges={packageLodges} baseTotal={total} />;
}

function parsePrice(price: string) {
  const value = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

