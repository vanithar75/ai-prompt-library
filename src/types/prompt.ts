export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type PromptCategory =
  | "coding"
  | "writing"
  | "analysis"
  | "creative"
  | "business"
  | "education"
  | "other";

export const CATEGORIES: PromptCategory[] = [
  "coding",
  "writing",
  "analysis",
  "creative",
  "business",
  "education",
  "other",
];
