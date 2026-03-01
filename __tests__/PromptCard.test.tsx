import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import PromptCard from "@/components/PromptCard";
import { Prompt } from "@/types/prompt";

const mockPrompt: Prompt = {
  id: "test-1",
  title: "Test Prompt",
  content: "This is a test prompt content for unit testing.",
  category: "coding",
  tags: ["test", "jest"],
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

describe("PromptCard", () => {
  it("renders prompt title and content", () => {
    render(<PromptCard prompt={mockPrompt} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText("Test Prompt")).toBeInTheDocument();
    expect(screen.getByText("This is a test prompt content for unit testing.")).toBeInTheDocument();
  });

  it("renders category badge", () => {
    render(<PromptCard prompt={mockPrompt} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText("coding")).toBeInTheDocument();
  });

  it("renders tags", () => {
    render(<PromptCard prompt={mockPrompt} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText("#test")).toBeInTheDocument();
    expect(screen.getByText("#jest")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = jest.fn();
    render(<PromptCard prompt={mockPrompt} onEdit={onEdit} onDelete={jest.fn()} />);
    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith(mockPrompt);
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = jest.fn();
    render(<PromptCard prompt={mockPrompt} onEdit={jest.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith("test-1");
  });

  it("shows Copy button", () => {
    render(<PromptCard prompt={mockPrompt} onEdit={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });
});
