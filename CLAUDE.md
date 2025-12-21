# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev              # Start development server (Turbopack enabled)
npm run build            # Build for production
npm start                # Run production server
npm run lint             # ESLint check (src directory)
npm run lint:fix         # ESLint auto-fix
npm run format           # Prettier formatting
npm test                 # Run Jest tests
npm run test:watch       # Jest watch mode
npm run test:coverage    # Jest with coverage report
npm run bundle-analyzer  # Analyze bundle size (ANALYZE=true)
```

## Architecture Overview

This is a Next.js 16 blog application using the App Router with TypeScript. Blog posts are stored as Markdown files with YAML front matter.

### Project Structure

```
app/                      # Next.js App Router
├── page.tsx             # Home page (first page of posts)
├── posts/[id]/page.tsx  # Individual post (dynamic route)
└── page/[number]/page.tsx # Paginated posts list

components/               # Atomic Design structure
├── Molecules/           # Small reusable components (DateBox, CodeBlock)
├── Organisms/           # Complex components (PostCard, Pagination)
├── templates/           # Page-level layouts (PostContent, SideBar)
└── pages/               # Page containers (TopPage, layout)

lib/
└── posts.ts             # Core blog post processing (markdown parsing, pagination)

posts/                    # Markdown blog posts (YYMMDD.md format)
types/blog.ts            # TypeScript types for blog data
```

### Blog Post Format

Posts are stored in `/posts` as `YYMMDD.md` files with front matter:

```markdown
---
title: 'Post Title'
date: '2023-03-10'
image: '/images/path/to/image.png'
metaDescription: 'Brief description'
tags:
  - 'Tag1'
  - 'Tag2'
---

# Content here
```

### Key Data Flow

1. `lib/posts.ts` reads markdown files using `fs.readFileSync`
2. `gray-matter` parses YAML front matter
3. `remark` + `remark-html` process markdown content
4. Pages use `generateStaticParams()` for static generation
5. Pagination: 24 posts per page

### Core Types (types/blog.ts)

```typescript
type PostData = {
  id: string;
  title: string;
  date: PostDate;
  image: string;
  metaDescription: string;
  tags: string[];
  content: string;
};

type PostParams = {
  params: Promise<{ id: string }>;  // Next.js 16+ async params
};
```

### Next.js 16 Specifics

- `params` in dynamic routes are Promises and must be awaited
- Turbopack is the default bundler
- Config requires `turbopack: {}` in next.config.js

## Testing

Tests use Jest with Testing Library. Test files are in `__tests__/` and co-located as `*.test.tsx`.

```bash
npm test                           # Run all tests
npm test -- --testPathPattern=posts # Run specific test file
```

Mock setup:
- CSS modules: `identity-obj-proxy`
- Images/fonts: `__mocks__/fileMock.js`
- next/image and next/link: Custom mocks in test files

## Key Libraries

- **gray-matter**: YAML front matter parsing
- **remark/remark-html**: Markdown processing
- **react-markdown**: Markdown rendering with custom components
- **react-syntax-highlighter**: Code block syntax highlighting
- **date-fns**: Date formatting
- **tailwindcss**: Utility-first CSS

## Environment Variables

- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: Google Analytics tracking (optional)
- `ANALYZE=true`: Enable bundle analyzer during build
