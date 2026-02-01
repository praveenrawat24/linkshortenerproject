# Agent Instructions — Authentication Layer

## Overview

All authentication in this project is handled exclusively by **Clerk**. No alternative authentication methods should be used or introduced.

## Core Rules

1. **Clerk only**: Do not implement, suggest, or enable any custom authentication, OAuth providers (except those Clerk manages), or alternative auth systems.
2. **Protected routes**: The `/dashboard` page is a protected route. Always check for authenticated users before rendering content.
3. **Redirect authenticated users**: When a logged-in user accesses the homepage (`/`), redirect them to `/dashboard`.
4. **Modal-based flows**: Sign in and sign up triggers must always open as modals, never as separate pages.

## Implementation Patterns

### Protecting Routes

Use Clerk's React hooks (`useAuth()`, `useUser()`) to check authentication status:

```typescript
"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  if (!userId) redirect("/");

  return <div>Protected content</div>;
}
```

For middleware-level protection, use `auth()` in middleware or layout:

```typescript
import { auth } from "@clerk/nextjs/server";

export async function middleware(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}
```

### Redirecting Authenticated Users from Homepage

In the homepage component, check if the user is logged in and redirect:

```typescript
"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/dashboard");
    }
  }, [isLoaded, userId, router]);

  if (isLoaded && userId) return null;

  return <div>Public homepage content</div>;
}
```

### Modal Sign In/Sign Up

Use Clerk's `<SignInButton>` and `<SignUpButton>` components with `mode="modal"`:

```typescript
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export function AuthButtons() {
  return (
    <>
      <SignInButton mode="modal" />
      <SignUpButton mode="modal" />
    </>
  );
}
```

## Checklist

- [ ] No custom auth logic in database or API routes
- [ ] Protected routes check `userId` before rendering
- [ ] Authenticated users on `/` redirect to `/dashboard`
- [ ] All sign in/sign up buttons use `mode="modal"`
- [ ] Environment variables (Clerk keys) are in `.env.local` (never committed)

## When to Escalate

- Requests to add SSO or identity providers not supported by Clerk
- Requests for custom JWT or session management
- Requests to store passwords or sensitive credentials

---

**Reference:** [Clerk Documentation](https://clerk.com/docs)
