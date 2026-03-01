import { CATEGORIES, Prompt, PromptCategory } from "@/types/prompt";

describe("Prompt types", () => {
  it("CATEGORIES contains expected values", () => {
    expect(CATEGORIES).toContain("coding");
    expect(CATEGORIES).toContain("writing");
    expect(CATEGORIES).toContain("analysis");
    expect(CATEGORIES).toContain("creative");
    expect(CATEGORIES).toContain("business");
    expect(CATEGORIES).toContain("education");
    expect(CATEGORIES).toContain("other");
    expect(CATEGORIES).toHaveLength(7);
  });

  it("a valid Prompt object matches the interface", () => {
    const prompt: Prompt = {
      id: "abc123",
      title: "My Prompt",
      content: "Do something useful",
      category: "coding" as PromptCategory,
      tags: ["ai", "test"],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    };
    expect(prompt.id).toBe("abc123");
    expect(prompt.tags).toHaveLength(2);
    expect(CATEGORIES).toContain(prompt.category);
  });
});
