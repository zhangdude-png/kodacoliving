"use client";

import { Calendar } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site";

export function BookConsultation({
  children,
  variant = "default",
  size = "default",
}: {
  children: ReactNode;
  variant?: "default" | "dark" | "outline" | "light" | "ghost" | "soft";
  size?: "default" | "lg" | "sm";
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setSent(false);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          <Calendar className="h-4 w-4" />
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Book a consultation</DialogTitle>
        <DialogDescription>
          Unit audit for landlords, or a fleet walkthrough for operators. This
          demo keeps the form on your screen and does not send it anywhere.
        </DialogDescription>
        {sent ? (
          <div className="mt-5 rounded-2xl bg-soft p-4 text-sm leading-6 text-ink">
            <p className="font-semibold">Request noted on this device only.</p>
            <p className="mt-1 text-ink/70">
              Nothing was stored or emailed. To talk to a person, use the
              WhatsApp placeholder.
            </p>
            <a
              className="mt-3 inline-flex font-semibold text-primary"
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open WhatsApp placeholder
            </a>
          </div>
        ) : (
          <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
            <div className="grid gap-1.5">
              <Label htmlFor="consult-name">Name</Label>
              <Input id="consult-name" name="name" required autoComplete="name" />
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="consult-email">Email</Label>
                <Input
                  id="consult-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="consult-phone">Phone</Label>
                <Input id="consult-phone" name="phone" type="tel" required />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="consult-kind">I am enquiring as</Label>
              <select
                id="consult-kind"
                name="kind"
                className="h-11 rounded-xl border border-line bg-white px-3 text-sm"
                defaultValue="landlord"
              >
                <option value="landlord">A landlord with a unit</option>
                <option value="operator">An operator with a fleet</option>
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="consult-note">Unit address or room count</Label>
              <Input
                id="consult-note"
                name="note"
                required
                placeholder="e.g. 90 St Francis Rd, or 40 rooms"
              />
            </div>
            <Button type="submit" className="mt-1">
              Submit request
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
