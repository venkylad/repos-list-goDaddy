# GoDaddy Repositories Browser

A modern React application for browsing and searching GoDaddy's GitHub repositories with infinite scroll and real-time search.

## 🚀 Features

- **Browse Repositories** - View all GoDaddy public repositories with infinite scroll
- **Real-time Search** - Debounced search using GitHub's Search API (500ms delay)
- **Repository Details** - Comprehensive view with stats, languages, and metadata
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Loading States** - Skeleton screens for better user experience
- **Smart Caching** - React Query caches data for instant subsequent loads

## 📦 Tech Stack

- **React 19** + **TypeScript** - Type-safe UI development
- **Vite** - Fast build tool and dev server
- **React Router** - Slug-based routing (`/repos/:owner/:name`)
- **TanStack Query** - Server state management with caching
- **Tailwind CSS 4** - Utility-first styling
- **React Infinite Scroll** - Progressive data loading
- **Vitest** + **Testing Library** - Comprehensive test coverage
- **MSW** - API mocking for tests

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd godaddy-repos

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run tests
npm run test:ui    # Run tests with UI
npm run coverage   # Generate coverage report
npm run lint       # Lint code
```

## 🧪 Testing

Comprehensive test coverage using Vitest, React Testing Library, and MSW.

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run coverage
```

### Test Structure

```
tests/
├── hooks/              # Custom hook tests
├── mocks/              # MSW API handlers
├── pages/
│   ├── RepoDetailPage/     # Detail page & component tests
│   └── ReposListPage/      # List page & component tests
└── setup.ts
```

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── StatCard.tsx
│   ├── LanguageBar.tsx
│   ├── SkeletonGrid.tsx
│   └── skeleton/       # Loading skeletons
├── pages/              # Page components
│   ├── ReposListing.tsx
│   └── RepoDetailPage.tsx
├── hooks/              # Custom React hooks
│   ├── useRepos.ts
│   └── useDebounce.ts
├── types/              # TypeScript definitions
│   └── github.ts
├── utils/              # Helper functions
│   └── api.ts
└── App.tsx             # Root component with routing
```

## 🎯 Key Design Decisions

### 1. Slug-Based URLs

Uses `/repos/:owner/:name` instead of `/repos/:id` for better SEO and user experience.

**Example:** `/repos/godaddy/kubernetes-client` instead of `/repos/4967118`

### 2. API-Powered Search

Uses GitHub's Search API (`/search/repositories`) instead of client-side filtering for more powerful search capabilities.

### 3. Debounced Search (500ms)

Waits 500ms after user stops typing before making API calls to reduce request spam and improve performance.

### 4. React Query Caching

- **5-minute stale time** - Data stays fresh for 5 minutes
- **10-minute garbage collection** - Unused data cleared after 10 minutes
- **Instant results** - Cached searches return immediately

### 5. Component Composition

Broke down large components into smaller, focused pieces:

- `StatCard` - Reusable stat display
- `LanguageBar` - Language breakdown visualization
- `SkeletonGrid` - Reusable loading skeleton
- `RepoHeader`, `RepoInfoGrid` - Focused sections

## 🎨 Features Showcase

### Repository List

- Infinite scroll with 30 repos per page
- Real-time search with debouncing
- Responsive grid (1→2→3→4 columns)
- Skeleton loading states
- Repository cards with stats

### Repository Details

- Language breakdown with visual bar
- Stats: stars, forks, watchers, issues
- Metadata: created date, updated date, license, default branch
- Archived badge for archived repos
- Direct link to GitHub

## 📈 Performance Optimizations

1. **React Query Caching** - Reduces API calls with intelligent caching
2. **Debounced Search** - 500ms delay prevents request spam
3. **Code Splitting** - React Router enables automatic route-based splitting
4. **Infinite Scroll** - Loads data progressively (30 repos at a time)
5. **Skeleton Screens** - Better perceived performance during loading

## 🚧 Known Limitations

- GitHub API rate limit: 60 requests/hour (unauthenticated)
- No repository comparison feature
- No favorites/bookmarking (would require localStorage consent)

## 📝 Future Enhancements

- Add filters (language, stars, last updated)
- Repository comparison feature
- Dark mode support
- GitHub OAuth for higher rate limits
- Virtual scrolling for better performance with large datasets
- PWA with offline support
- Analytics for popular repositories

