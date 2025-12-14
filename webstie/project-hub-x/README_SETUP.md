# Project Hub X - Local Setup Instructions

This project has been converted from Wix AI Website Builder to a standalone Astro application that runs locally.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. **Install dependencies:**
   ```bash
   cd project-hub-x
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run check` - Run TypeScript type checking
- `npm run test:run` - Run tests with Vitest

## Project Structure

```
project-hub-x/
├── src/
│   ├── components/       # React components
│   │   ├── layout/      # Header, Footer components
│   │   ├── pages/       # Page components (HomePage, ProjectsPage, etc.)
│   │   └── ui/          # Reusable UI components
│   ├── pages/           # Astro pages
│   ├── styles/          # Global styles
│   └── entities/        # TypeScript type definitions
├── integrations/
│   ├── cms/            # Mock CMS service (replaces Wix Data)
│   │   ├── service.ts  # CRUD operations
│   │   ├── mock-data.ts # In-memory data store
│   │   └── sample-data.ts # Sample data initializer
│   └── members/        # Mock authentication (replaces Wix Members)
│       ├── service.ts  # Auth service
│       └── mock-auth.ts # Mock authentication implementation
└── public/             # Static assets

## Changes from Wix Version

### What Was Removed:
- All `@wix/*` packages and dependencies
- Wix CLI (`wix dev`, `wix build`, etc.)
- Wix authentication and member management
- Wix Data collections
- Wix image optimization services
- Wix SEO components
- Wix monitoring and analytics

### What Was Added:
- **Mock CMS System**: Local in-memory data storage replacing Wix Data collections
- **Mock Authentication**: Simple localStorage-based authentication replacing Wix Members
- **Standard Image Component**: Regular HTML image handling
- **Node.js Adapter**: For SSR support without Wix infrastructure
- **Sample Data**: Pre-populated sample data for development

## Mock Data System

The application now uses an in-memory data store for all data operations. Data is stored in:
- `integrations/cms/mock-data.ts` - Core data store
- `integrations/cms/sample-data.ts` - Sample data initialization

### Collections Available:
- `readymadeprojects` - Ready-made projects/products
- `customprojectrequests` - Custom project requests
- `faq` - FAQ items
- `howitworkssteps` - How it works steps
- `clienttestimonials` - Client testimonials
- `developerprofiles` - Developer profiles

### Adding Sample Data:
To populate the app with sample data, edit `integrations/cms/sample-data.ts` and call `initializeSampleData()` from your page components.

## Mock Authentication

The application includes a simple authentication system that stores user data in localStorage:

- Login credentials are not validated (any email/password combination works)
- User session persists in browser localStorage
- To logout, use the logout function or clear localStorage

### Testing Authentication:
1. Click on "Sign In" in the application
2. Enter any email and password
3. You'll be logged in and the session will persist

## Styling

All original styles are preserved using:
- Tailwind CSS
- Custom CSS in `src/styles/`
- Component-specific CSS modules

## Known Limitations

1. **No Backend**: Data is stored in-memory and will be lost on page refresh
2. **No Real Authentication**: Auth is mock-only, not suitable for production
3. **No Image Optimization**: Images load as-is without Wix's optimization
4. **No SEO Services**: Basic meta tags only, no dynamic SEO optimization

## Next Steps for Production

To make this production-ready, you should:

1. **Add a Real Database**: Replace mock data store with PostgreSQL, MongoDB, etc.
2. **Implement Real Authentication**: Use NextAuth, Auth0, or similar
3. **Add Image Optimization**: Use Sharp or a CDN service
4. **Deploy**: Deploy to Vercel, Netlify, or your preferred hosting platform
5. **Add Environment Variables**: For API keys, database URLs, etc.

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, edit `astro.config.mjs` and change the port number.

### Missing Dependencies
If you encounter missing dependency errors, run:
```bash
npm install
```

### TypeScript Errors
Run the type checker to see detailed errors:
```bash
npm run check
```

## Support

For issues or questions, refer to:
- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
