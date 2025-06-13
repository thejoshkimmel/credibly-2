# Credibly

A Next.js application for managing and sharing user ratings.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/credibly.git
cd credibly
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your local values.

4. Run the development server:
```bash
npm run dev
```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

2. Go to [Vercel](https://vercel.com) and:
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: npm run build
     - Output Directory: .next

3. Add Environment Variables in Vercel:
   - Go to Project Settings > Environment Variables
   - Add all variables from your `.env` file:
     ```
     DATABASE_URL=your_production_db_url
     JWT_SECRET=your_production_jwt_secret
     JWT_EXPIRES_IN=7d
     NEXT_PUBLIC_API_BASE_URL=https://your-domain.vercel.app/api
     API_BASE_URL=https://your-domain.vercel.app/api
     ```

4. Deploy:
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a production URL

### Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRES_IN`: JWT token expiration time
- `NEXT_PUBLIC_API_BASE_URL`: Public API base URL
- `API_BASE_URL`: Server-side API base URL

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable components
├── features/         # Feature modules
├── lib/             # Utilities and configurations
└── styles/          # Global styles
```

## Contributing

1. Create a new branch
2. Make your changes
3. Submit a pull request

## License

MIT