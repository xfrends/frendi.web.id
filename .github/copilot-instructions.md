# AI Agent Instructions for Personal Website Project

## Project Overview
This is a Next.js-based personal website/portfolio project utilizing modern web technologies and UI components. The project is designed to be a static site export (`output: 'export'` in next.config.js).

## Core Architecture

### Key Components
- `app/` - Next.js App Router implementation with RootLayout in `layout.tsx`
- `components/` - React components organized by feature (Hero, About, Services, etc.)
- `components/ui/` - Reusable UI components based on shadcn/ui and Radix UI primitives
- `lib/` - Utility functions and shared code
- `hooks/` - Custom React hooks

### Technology Stack
- Next.js 13+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui component library
- Radix UI primitives

## Development Workflows

### Getting Started
```bash
npm install
npm run dev
```

### Building
```bash
npm run build
npm run start
```

### Conventions

1. **Component Structure**
   - Use TypeScript for all components
   - Components are organized by feature in root `components/` directory
   - Reusable UI components go in `components/ui/`
   - Example component structure from `Hero.tsx`:
   ```tsx
   export default function Hero() {
     return (
       <section className="relative min-h-screen">
         {/* Structure: Background -> Decorative Elements -> Content */}
       </section>
     );
   }
   ```

2. **Styling**
   - Use Tailwind CSS classes directly in components
   - Utilize shadcn/ui components for consistent UI elements
   - Follow the gradient styling pattern for text and backgrounds
   - CSS variables and theming configured in `components.json`

3. **File Organization**
   - Path aliases defined in `components.json`:
     - `@/components/*` for component imports
     - `@/lib/*` for utilities
     - `@/hooks/*` for custom hooks
     - `@/ui/*` for shadcn/ui components

4. **Performance**
   - Images are unoptimized for static export (configured in next.config.js)
   - ESLint is ignored during builds for faster compilation

## Common Patterns

1. **Page Components**
   - Pages use a semantic sectioning pattern (Hero -> About -> Services -> etc.)
   - Each section is a self-contained component

2. **UI Components**
   - Use `@/components/ui/button` and other shadcn/ui components
   - Follow Radix UI primitive patterns for accessibility

3. **Metadata**
   - SEO and Open Graph metadata defined in `app/layout.tsx`
   - Follow the existing pattern for adding new metadata

## Critical Development Rules

1. **Component Development**
   - Create beautiful, production-worthy designs - avoid cookie-cutter implementations
   - Always add `"use client"` directive at the top of files using client-side hooks (useState, useEffect)
   - Prevent server/client mismatch errors - avoid extra "class,style" attributes from server components

2. **UI Dependencies**
   - Use only built-in libraries by default:
     - JSX with Tailwind CSS
     - shadcn/ui components
     - React hooks
     - Lucide React for icons
   - Do not install additional UI/theme/icon packages unless explicitly requested

3. **Icons and Assets**
   - Use `lucide-react` for all logo and icon needs
   - Follow the project's gradient and styling patterns for visual consistency

## Integration Points
- All UI components are built on Radix UI primitives
- Tailwind CSS configuration in `tailwind.config.ts`
- Type definitions extend Next.js types in `next-env.d.ts`