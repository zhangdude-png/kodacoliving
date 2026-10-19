import { en } from "@/messages/en";
import { zhHans } from "@/messages/zh-Hans";

export type Locale = "en" | "zh-Hans";

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type MarketingMessages = Widen<typeof en>;

export function getMessages(locale: Locale): MarketingMessages {
  return locale === "zh-Hans" ? zhHans : en;
}
