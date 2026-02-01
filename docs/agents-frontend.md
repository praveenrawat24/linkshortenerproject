# Agent Instructions — Frontend & UI Components

## Overview

This document guides agents building frontend features in the Link Shortener app. All UI must use **shadcn/ui** components only—never create custom components.

## Core Rules

1. **shadcn/ui Only**: Use existing shadcn components (`Button`, `Input`, `Dialog`, `Card`, etc.). Do not create custom UI components.
2. **Styling**: Use Tailwind CSS for all styling. Follow the class naming patterns already in use.
3. **Component Location**: Place all components in `app/` directory following Next.js conventions.
4. **TypeScript**: Use strict TypeScript. Avoid `any` types.

## Next.js App Directory Conventions

- **Server Components** (default): Use for layout, data fetching, database queries. Do NOT import client-only libraries.
- **Client Components**: Mark with `"use client"` at the top. Use for interactivity, state, event handlers.
- Keep component files colocated with their routes in `app/`.

Example structure:

```
app/
  layout.tsx          # Server component (root layout)
  page.tsx            # Server component (home page)
  links/
    [id]/
      page.tsx        # Server component
      edit-form.tsx   # Client component for editing
```

## shadcn/ui Usage Patterns

### Installing Components

Use the shadcn CLI to add components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
```

Components install into `components/ui/` (pre-configured in the project).

### Common Components

- **Button**: All interactive buttons. Use `variant` and `size` props for styling.
- **Input**: Form inputs. Include proper labels.
- **Dialog**: Modals and overlays. Use with form components inside.
- **Card**: Content containers. Compose with `CardHeader`, `CardContent`, `CardFooter`.
- **Select**: Dropdowns.
- **Form**: For complex forms with validation.

### Example: Simple Form with Dialog

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function CreateLinkDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Create Link</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Short Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Enter URL" required />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

## Styling with Tailwind

- Use utility classes: `className="flex items-center justify-between p-4 rounded-lg"`
- For complex spacing/layout, extract to consistent patterns (e.g., form grids).
- Dark mode: shadcn components support dark mode via `next-themes`. Use `dark:` prefix if needed.
- Avoid inline styles; use Tailwind classes only.

## State Management

- Use React hooks (`useState`, `useEffect`) for local component state.
- Use URL search params for global filters/pagination (e.g., `?page=2&sort=date`).
- For Clerk authentication state, use provided `useAuth()` and `useUser()` hooks.

## Forms & Validation

- Use shadcn `Form` component with validation libraries if complex.
- For simple validation, use HTML5 attributes (`required`, `type="email"`, `minLength`).
- Always validate server-side in API routes; client-side is UX only.

## Accessibility (a11y)

- All interactive elements must be keyboard navigable.
- Use semantic HTML: `<button>`, `<form>`, `<label>` tags.
- shadcn components handle ARIA attributes automatically; do not override unless necessary.
- Test with keyboard navigation before submitting.

## Best Practices

- Keep components focused and small (< 200 lines).
- Extract repeated UI patterns into separate client components.
- Use `React.memo` only if profiling shows performance issues.
- Avoid prop drilling; use Context for deeply nested state if needed.
- Inline comments for non-obvious logic; avoid over-commenting.

## API Integration

- Use `fetch()` or a wrapper from `lib/utils.ts` for HTTP calls.
- Fetch data in Server Components when possible (simpler, better SEO).
- For client-side data fetching, handle loading and error states explicitly.
- Never expose sensitive data (API keys, auth tokens) to the client.

## Testing & Local Verification

```bash
npm run dev       # Run local dev server
npm run build     # Check build succeeds
npm run lint      # Check for TypeScript/ESLint errors
```

After adding a new component:

1. Verify it renders without errors.
2. Test interactivity (clicks, form submission).
3. Check responsive behavior (desktop, tablet, mobile).
4. Verify keyboard navigation works.

## Checklist for PRs

- [ ] Only shadcn/ui components used (no custom components).
- [ ] TypeScript strict mode; no `any` types.
- [ ] Tailwind classes only for styling.
- [ ] Proper `"use client"` / server component split.
- [ ] Accessible (keyboard navigable, semantic HTML).
- [ ] `npm run lint` passes.
- [ ] Tested locally at `npm run dev`.

---

For authentication-specific UI patterns, see [agents-auth.md](agents-auth.md).
