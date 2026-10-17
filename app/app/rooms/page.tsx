import type { Metadata } from "next";
import { RoomsView } from "@/components/console/rooms-view";

export const metadata: Metadata = { title: "Room inventory" };

export default function RoomsPage() {
  return <RoomsView />;
}
