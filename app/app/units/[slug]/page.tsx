import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyView } from "@/components/console/property-view";
import { getUnit, units } from "@/lib/demo-data";

export const instant = false;

export function generateStaticParams() {
  return units.map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnit(slug);
  return { title: unit ? unit.name : "Unit" };
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) notFound();
  return <PropertyView unit={unit} />;
}
