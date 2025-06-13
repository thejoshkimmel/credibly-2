# Credibly

A professional networking and rating platform.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── api/               # API routes
├── components/            # React components
│   ├── common/           # Shared components
│   ├── features/         # Feature-specific components
│   └── ui/              # UI components (shadcn)
├── config/               # Configuration files
├── features/            # Feature modules
│   ├── auth/           # Authentication feature
│   ├── ratings/        # Ratings feature
│   └── users/          # User management feature
├── hooks/              # Custom React hooks
├── lib/               # Core utilities
│   ├── api/          # API utilities
│   ├── auth/         # Authentication utilities
│   └── db/           # Database utilities
├── models/           # Database models
├── styles/          # Global styles
└── types/          # TypeScript types
```

## Clean Code Principles

1. **Naming Conventions**
   - Use descriptive names: `calculateAverageRating` instead of `calcAvg`
   - Use consistent casing: camelCase for variables/functions, PascalCase for components
   - Prefix boolean variables with is/has/should: `isVerified`, `hasPermission`

2. **Function Guidelines**
   - Single Responsibility: Each function should do one thing
   - Keep functions small (under 20 lines)
   - Use descriptive names that explain what they do
   - Return early to avoid deep nesting

3. **Component Structure**
   - One component per file
   - Props interface at the top
   - Destructure props in parameters
   - Keep components focused and reusable

4. **Code Organization**
   - Group related code together
   - Use feature-based folder structure
   - Keep configuration separate from logic
   - Use index files for clean exports

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

1. **Code Style**
   - Use Prettier for formatting
   - Follow ESLint rules
   - Write meaningful commit messages

2. **Testing**
   - Write unit tests for utilities
   - Write integration tests for features
   - Test edge cases and error handling

3. **Documentation**
   - Document complex functions
   - Add JSDoc comments for public APIs
   - Keep README up to date

4. **Performance**
   - Use React.memo for expensive components
   - Implement proper loading states
   - Optimize images and assets
