"use client";

import { useState } from "react";
import { Prompt } from "@/types/prompt";
import { usePrompts } from "@/hooks/usePrompts";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import PromptCard from "@/components/PromptCard";
import PromptForm from "@/components/PromptForm";
import ImportExport from "@/components/ImportExport";

export default function Home() {
  const {
    prompts,
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
  } = usePrompts();

  const [showForm, setShowForm] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPrompt(null);
  };

  const handleSave = (data: Parameters<typeof addPrompt>[0]) => {
    addPrompt(data);
    setShowForm(false);
  };

  const handleUpdate = (id: string, data: Parameters<typeof addPrompt>[0]) => {
    updatePrompt(id, data);
    setShowForm(false);
    setEditingPrompt(null);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Prompt Library
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Save, organize, and reuse your best AI prompts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ImportExport onImport={importPrompts} onExport={exportPrompts} />
            <button
              onClick={() => {
                setEditingPrompt(null);
                setShowForm(true);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Prompt
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Filters */}
        <FilterBar
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          tagFilter={tagFilter}
          onTagChange={setTagFilter}
          allTags={allTags}
        />
      </header>

      {/* Prompt Grid */}
      {prompts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 dark:text-gray-500 text-lg">
            {search || categoryFilter !== "all" || tagFilter
              ? "No prompts match your filters."
              : 'No prompts yet. Click "+ New Prompt" to get started!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onEdit={handleEdit}
              onDelete={deletePrompt}
            />
          ))}
        </div>
      )}

      {/* Count */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 text-center">
        {prompts.length} prompt{prompts.length !== 1 ? "s" : ""}
      </p>

      {/* Form Modal */}
      {showForm && (
        <PromptForm
          editingPrompt={editingPrompt}
          onSave={handleSave}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
