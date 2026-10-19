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
import { en } from "@/messages/en";
import type { MarketingMessages } from "@/messages";

export function BookConsultation({
  children,
  variant = "default",
  size = "default",
  copy = en.consultation,
}: {
  children: ReactNode;
  variant?: "default" | "dark" | "outline" | "light" | "ghost" | "soft";
  size?: "default" | "lg" | "sm";
  copy?: MarketingMessages["consultation"];
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
        <DialogTitle>{copy.title}</DialogTitle>
        <DialogDescription>{copy.description}</DialogDescription>
        {sent ? (
          <div className="mt-5 rounded-2xl bg-soft p-4 text-sm leading-6 text-ink">
            <p className="font-semibold">{copy.notedTitle}</p>
            <p className="mt-1 text-ink/70">{copy.notedBody}</p>
            <a
              className="mt-3 inline-flex font-semibold text-secondary-text"
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.whatsapp}
            </a>
          </div>
        ) : (
          <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
            <div className="grid gap-1.5">
              <Label htmlFor="consult-name">{copy.name}</Label>
              <Input id="consult-name" name="name" required autoComplete="name" />
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="consult-email">{copy.email}</Label>
                <Input
                  id="consult-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="consult-phone">{copy.phone}</Label>
                <Input id="consult-phone" name="phone" type="tel" required />
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="consult-kind">{copy.kind}</Label>
              <select
                id="consult-kind"
                name="kind"
                className="h-11 rounded-xl border border-line bg-white px-3 text-sm"
                defaultValue="landlord"
              >
                <option value="landlord">{copy.kindLandlord}</option>
                <option value="operator">{copy.kindOperator}</option>
              </select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="consult-note">{copy.note}</Label>
              <Input
                id="consult-note"
                name="note"
                required
                placeholder={copy.notePlaceholder}
              />
            </div>
            <Button type="submit" className="mt-1">
              {copy.submit}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
