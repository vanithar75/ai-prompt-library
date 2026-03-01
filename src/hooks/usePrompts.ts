"use client";

import { useState, useEffect, useCallback } from "react";
import { Prompt, PromptCategory } from "@/types/prompt";

const STORAGE_KEY = "ai-prompt-library";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function loadPrompts(): Prompt[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function savePrompts(prompts: Prompt[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<PromptCategory | "all">("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPrompts(loadPrompts());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      savePrompts(prompts);
    }
  }, [prompts, isLoaded]);

  const addPrompt = useCallback(
    (data: { title: string; content: string; category: PromptCategory; tags: string[] }) => {
      const now = new Date().toISOString();
      const newPrompt: Prompt = {
        id: generateId(),
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      setPrompts((prev) => [newPrompt, ...prev]);
    },
    []
  );

  const updatePrompt = useCallback(
    (id: string, data: Partial<Omit<Prompt, "id" | "createdAt">>) => {
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
        )
      );
    },
    []
  );

  const deletePrompt = useCallback((id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const importPrompts = useCallback((imported: Prompt[]) => {
    setPrompts((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const newOnes = imported.filter((p) => !existingIds.has(p.id));
      return [...newOnes, ...prev];
    });
  }, []);

  const exportPrompts = useCallback((): string => {
    return JSON.stringify(prompts, null, 2);
  }, [prompts]);

  const allTags = Array.from(new Set(prompts.flatMap((p) => p.tags))).sort();

  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    const matchesTag = !tagFilter || p.tags.includes(tagFilter);
    return matchesSearch && matchesCategory && matchesTag;
  });

  return {
    prompts: filteredPrompts,
    allPrompts: prompts,
    allTags,
    isLoaded,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    tagFilter,
    setTagFilter,
    addPrompt,
    updatePrompt,
    deletePrompt,
    importPrompts,
    exportPrompts,
  };
}
