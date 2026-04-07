import type { Initiative, OKR } from "./initiatives";
import { initiatives, okrs, krDetailsQ1 } from "./initiatives";

// Q2 2026 uses the same initiatives and OKRs as Q1
export const initiativesQ22026: Initiative[] = [...initiatives];
export const okrsQ22026: OKR[] = [...okrs];
export const krDetailsQ22026: Record<string, string> = { ...krDetailsQ1 };
