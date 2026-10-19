import { en } from "@/messages/en";

export type FaqItem = { question: string; answer: string };

export const operatorFaqs: FaqItem[] = en.faq.operators;
export const landlordFaqs: FaqItem[] = en.faq.landlords;
export const comparisonRows = en.comparison.rows;
