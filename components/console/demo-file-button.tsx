"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DemoFileButton({
  label,
  detail,
}: {
  label: string;
  detail: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{label}</DialogTitle>
        <DialogDescription>
          {detail} This demo does not store the file. Nothing will download.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
