import type { Initiative } from "./initiatives";

export interface OKR {
  id: string;
  title: string;
  objective: string;
  keyResults: { id: string; title: string; current: number; target: number }[];
}

// Placeholder data - to be filled
export const initiativesQ22026: Initiative[] = [];

export const okrsQ22026: OKR[] = [];

export const krDetailsQ22026: Record<string, string> = {};
