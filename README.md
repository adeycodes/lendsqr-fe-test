# Lendsqr Admin Portal - Frontend Assessment

A fully responsive admin dashboard for managing users, built with React, TypeScript, and SCSS.

## 🌐 Live Demo

**Deployed Application:** [https://YOUR-NAME-lendsqr-fe-test.vercel.app](https://YOUR-NAME-lendsqr-fe-test.vercel.app)

## 📸 Screenshots

### Desktop View
![Users Page](./screenshots/users-page.png)
![User Details](./screenshots/user-details.png)

### Mobile View
![Mobile Responsive](./screenshots/mobile-view.png)

## ✨ Features

### Core Functionality
- ✅ **Authentication** - Login page with form validation
- ✅ **User Management** - View, filter, and manage 500+ users
- ✅ **Advanced Filtering** - Filter by organization, username, email, phone number, date, and status
- ✅ **Pagination** - Flexible pagination (10, 25, 50, 100 per page)
- ✅ **User Details** - Comprehensive user information with localStorage persistence
- ✅ **Status Management** - Activate or blacklist users
- ✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

### Technical Features
- 📱 Mobile-first responsive design
- 💾 LocalStorage for data persistence
- 🎨 Custom SCSS architecture with variables and mixins
- 🔍 Real-time search and filtering
- ⚡ Optimized performance with React hooks (useMemo, useCallback)
- 📊 Statistics dashboard with user metrics
- 🎯 TypeScript for type safety

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** SCSS (Sass)
- **Routing:** React Router v6
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library
- **Deployment:** Vercel

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/lendsqr-fe-test.git
cd lendsqr-fe-test
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🧪 Testing

Run unit tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🏗️ Project Structure
```
lendsqr-admin-portal/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Generic components (buttons, cards, etc.)
│   │   ├── layout/         # Layout components (header, sidebar)
│   │   └── users/          # User-specific components
│   ├── pages/              # Page components
│   │   ├── Login/          # Login page
│   │   ├── Users/          # Users listing page
│   │   └── UserDetails/    # User details page
│   ├── services/           # API and storage services
│   │   ├── api.ts          # API functions
│   │   └── storage.ts      # LocalStorage utilities
│   ├── styles/             # SCSS styles
│   │   ├── components/     # Component-specific styles
│   │   ├── _variables.scss # SCSS variables
│   │   ├── _mixins.scss    # SCSS mixins
│   │   └── global.scss     # Global styles
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Mock data (500 users)
│   └── App.tsx             # Root component
├── public/                 # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Primary Blue:** `#213F7D`
- **Primary Cyan:** `#39CDCC`
- **Text Primary:** `#213F7D`
- **Text Secondary:** `#545F7D`
- **Background:** `#FAFAFA`

### Status Colors
- **Active:** `#39CD62` (Green)
- **Inactive:** `#545F7D` (Gray)
- **Pending:** `#E9B200` (Yellow)
- **Blacklisted:** `#E4033B` (Red)

### Typography
- **Font Family:** Work Sans, Avenir Next, system fonts
- **Base Size:** 14px

### Breakpoints
- **Mobile:** ≤ 768px
- **Tablet:** 768px - 1024px
- **Desktop:** ≥ 1024px

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile (≤768px):** Stacked layout, collapsible sidebar, touch-optimized
- **Tablet (768-1024px):** Optimized grid layouts
- **Desktop (≥1024px):** Full sidebar, multi-column layouts

## 🔑 Key Implementation Decisions

### 1. **SCSS Over Tailwind**
Chose SCSS for better maintainability, variable management, and to meet assessment requirements. Implemented a comprehensive design system with variables and mixins.

### 2. **LocalStorage for Persistence**
Used localStorage instead of IndexedDB for simplicity and better compatibility. User data and filter states persist across sessions.

### 3. **Component Architecture**
Followed atomic design principles with reusable components. Separated concerns between presentation and business logic.

### 4. **Performance Optimization**
- Used `useMemo` for expensive computations (filtering, pagination)
- Implemented lazy loading for user details
- Optimized re-renders with proper state management

### 5. **Type Safety**
Comprehensive TypeScript interfaces for all data structures, ensuring type safety throughout the application.

## 🧪 Testing Strategy

### Test Coverage
- ✅ Component rendering tests
- ✅ User interaction tests
- ✅ Form validation tests
- ✅ Filter functionality tests
- ✅ Pagination tests
- ✅ LocalStorage integration tests
- ✅ API service tests

### Example Tests
```typescript
// Filter functionality
test('filters users by status', () => {
  // Test implementation
});

// Pagination
test('changes items per page', () => {
  // Test implementation
});

// Navigation
test('navigates to user details', () => {
  // Test implementation
});
```

## 🚀 Deployment

Deployed on Vercel with automatic deployments from the main branch.

### Environment Variables
No environment variables required - uses mock data.

### Build Commands
```bash
npm run build    # Production build
npm run preview  # Preview production build
```

## 📝 Development Workflow

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Bug fixes
git checkout -b fix/bug-name
git commit -m "fix: resolve bug"
```

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

## 🐛 Known Issues & Future Improvements

### Current Limitations
- Mock data only (no real backend)
- Other tabs in user details (Documents, Bank Details, etc.) show placeholder content
- Date filter uses exact match (could be enhanced for range filtering)

### Planned Improvements
- [ ] Add real API integration
- [ ] Implement search with debouncing
- [ ] Add export to CSV functionality
- [ ] Add bulk actions for users
- [ ] Implement user creation/editing
- [ ] Add more comprehensive error handling
- [ ] Implement skeleton loaders

## 📄 License

This project was created as part of the Lendsqr frontend assessment.

## 👤 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Design provided by Lendsqr
- Assessment requirements by Lendsqr Engineering Team
- Mock data generated using json-generator.com

---

**Built with ❤️ for Lendsqr Frontend Assessment**
