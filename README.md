# AI Prompt Library

A web app to save, organize, search, and manage your AI prompts. Built with Next.js, TypeScript, and Tailwind CSS.

![CI](https://github.com/vanithar75/ai-prompt-library/actions/workflows/ci.yml/badge.svg)

## Features

- **Create** prompts with title, content, category, and tags
- **Browse** prompts in a responsive card grid
- **Search** by title or content
- **Filter** by category (coding, writing, analysis, creative, business, education)
- **Filter by tags** with one-click chip filters
- **Edit / Delete** prompts
- **Copy to clipboard** for quick use
- **Import / Export** prompts as JSON for backup and sharing
- **Dark mode** support (follows system preference)
- **Persistent storage** via localStorage

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/vanithar75/ai-prompt-library.git
cd ai-prompt-library
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **localStorage** for persistence
- **Jest** + **React Testing Library** for tests
- **GitHub Actions** for CI

## Project Structure

```
src/
├── app/           # Next.js App Router pages and layout
├── components/    # Reusable React components
├── hooks/         # Custom React hooks (usePrompts)
└── types/         # TypeScript interfaces
__tests__/         # Unit and component tests
.github/workflows/ # CI configuration
```

## License

MIT
