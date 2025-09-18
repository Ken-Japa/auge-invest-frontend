# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Auge Invest** is a Brazilian financial market analysis platform built with Next.js, TypeScript, and Material-UI. It provides comprehensive tools for investors to analyze Brazilian stocks, FIIs (Real Estate Investment Funds), ETFs, BDRs (Brazilian Depositary Receipts), and perform fundamental analysis.

## Development Commands

### Basic Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Generate blog summaries
npm run blog-summary
```

### Testing Commands
- No test framework is currently configured in the project

### Development Server
- Development server runs on `http://localhost:3000`
- Uses Next.js 14+ with App Router
- Hot reload is enabled for development

## Architecture Overview

### High-Level Structure

#### Frontend Architecture
- **Framework**: Next.js 14+ with App Router and TypeScript
- **UI Library**: Material-UI (MUI) v6 with custom theming
- **Styling**: Tailwind CSS + Material-UI components
- **State Management**: Zustand for global state, React Query for server state
- **Authentication**: NextAuth.js with Google OAuth and credentials
- **Charts/Visualization**: D3.js, Nivo, Recharts for financial data visualization

#### Key Architectural Patterns

1. **Route-Based Structure**: Uses Next.js App Router with route groups
   - `(auth)` - Protected routes for authenticated users
   - `visitante` - Public pages for visitors
   - `blog` - Blog functionality with static content

2. **Component Organization**: Hierarchical component structure
   - `components/` - Reusable UI components organized by type (Core, Data-Display, Form, Layout, etc.)
   - `pagesComponents/` - Page-specific components separated by user type (Logado/Nao-Logado)

3. **Service Layer**: Centralized API management
   - `services/api/` - API client with interceptors, error handling, and typed endpoints
   - Supports authentication, companies, users, wallet, alerts, and various financial instruments

4. **State Management Strategy**:
   - **Zustand**: For client-side global state (currently only company filters)
   - **React Query**: For server state management, caching, and data synchronization
   - **Context Providers**: For theme, authentication, and API configuration

### Directory Structure Deep Dive

#### Core Application Structure
```
src/
├── app/                     # Next.js App Router pages
│   ├── (auth)/             # Protected routes (dashboard, alerts, portfolio)
│   ├── visitante/          # Public pages (landing, pricing, about)
│   ├── blog/               # Blog system with markdown content
│   └── api/                # API routes (NextAuth configuration)
├── components/             # Reusable UI components
│   ├── Core/               # Basic UI components (Button, Card, Accordion)
│   ├── Data-Display/       # Charts, tables, pagination
│   ├── Form/               # Form components and inputs
│   ├── Layout/             # Header, footer, navigation
│   └── Theme/              # Theme switching components
├── pagesComponents/        # Page-specific component logic
│   ├── Logado/             # Authenticated user pages
│   └── Nao-Logado/        # Public pages
├── services/               # API layer and external services
├── providers/              # React context providers
├── store/                  # Zustand stores
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions
```

#### Authentication Flow
- **NextAuth.js** handles authentication with dual provider support:
  - Google OAuth integration with backend verification
  - Credentials-based login with custom backend API
- **Token Management**: Uses both HTTP-only cookies and client-accessible tokens
- **Session Strategy**: JWT-based sessions with 30-day expiration

#### Financial Data Architecture
The platform handles multiple Brazilian financial instruments:
- **Empresas** (Companies): Stock analysis with fundamentalist tools
- **FIIs**: Real Estate Investment Fund tracking
- **BDRs**: Brazilian Depositary Receipts (both regular and non-participating)
- **ETFs**: Exchange Traded Funds (including ETF BDRs)
- **Derivativos**: Options and derivatives trading data

#### API Integration Pattern
```typescript
// Centralized API client with authentication interceptors
// All endpoints are typed and organized by domain
api.companies.getCompanyDetails(code)
api.wallet.createTransaction(data)
api.alerts.createAlert(alertData)
```

## Development Guidelines

### Code Organization
- Use absolute imports with `@/*` path mapping
- Organize components by domain/feature rather than technical layer
- Keep API-related code in the `services/` directory
- Use TypeScript strictly - all API responses are typed

### State Management
- **Local State**: Use React's `useState` for component-level state
- **Global State**: Use Zustand stores for cross-component state (filters, selections)
- **Server State**: Use React Query for all API data fetching and caching
- **Authentication State**: Managed by NextAuth.js session provider

### Styling Approach
- **Primary**: Material-UI components with custom theme
- **Utility**: Tailwind CSS for spacing, colors, and responsive design
- **Theme System**: Dark/light mode with localStorage persistence
- **Responsive**: Mobile-first design with Material-UI breakpoints

### API Communication
- All API calls go through the centralized `apiClient`
- Automatic token injection via Axios interceptors
- Centralized error handling with user-friendly messages
- Base API URL: `https://api-servidor-yupg.onrender.com` (configurable via env)

### Component Development
- Follow Material-UI patterns and design system
- Use TypeScript interfaces for all props
- Implement loading and error states for data-dependent components
- Organize complex page components in subdirectories with hooks, services, and types

### Performance Considerations
- React Query handles caching and background updates
- Image optimization through Next.js Image component
- Lazy loading implemented for large component trees
- Code splitting at the route level via Next.js

## Environment Configuration

### Required Environment Variables
```bash
# Authentication
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# API
NEXT_PUBLIC_API_URL=https://api-servidor-yupg.onrender.com
```

### Development Setup
1. Copy `.env.local.example` to `.env.local`
2. Configure Google OAuth credentials
3. Set up API backend connection
4. Install dependencies: `npm install`
5. Start development: `npm run dev`

## Key Technical Decisions

### Why Next.js App Router
- Server-side rendering for SEO-critical financial content
- Built-in API routes for authentication
- File-based routing with layout support
- Streaming and concurrent features for better UX

### Material-UI + Tailwind CSS
- MUI provides comprehensive financial dashboard components
- Tailwind handles utility-first styling needs
- Custom theme system supports Brazilian market branding

### React Query for Data Management
- Financial data requires frequent updates and caching
- Built-in error boundary and retry logic
- Optimistic updates for better UX in portfolio management

### Zustand for Client State
- Lightweight alternative to Redux
- Excellent TypeScript support
- Minimal boilerplate for filter and selection state

This codebase represents a production-ready Brazilian fintech platform with comprehensive financial analysis tools, portfolio management, and real-time market data integration.