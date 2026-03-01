"use client";

import { useState } from "react";
import { Prompt } from "@/types/prompt";

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
}

export default function PromptCard({ prompt, onEdit, onDelete }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryColors: Record<string, string> = {
    coding: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    writing: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    analysis: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    creative: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
    business: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    education: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
    other: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
          {prompt.title}
        </h3>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
            categoryColors[prompt.category] || categoryColors.other
          }`}
        >
          {prompt.category}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 whitespace-pre-wrap">
        {prompt.content}
      </p>
      {prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {prompt.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={() => onEdit(prompt)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(prompt.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
