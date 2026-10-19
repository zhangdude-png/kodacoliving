import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoomManagement } from "@/components/console/room-management";
import { getRoom, rooms } from "@/lib/demo-data";

export const instant = false;

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const room = getRoom(id);
  return { title: room ? `${room.code} room` : "Room" };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = getRoom(id);
  if (!room) notFound();
  return <RoomManagement room={room} />;
}
