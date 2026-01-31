

# Lendsqr Admin Dashboard - Implementation Plan

## Project Overview
A complete admin dashboard for Lendsqr with login authentication, user management, and detailed user profiles. Built with React 18+, TypeScript, pure SCSS, and React Router v6.

---

## Phase 1: Project Setup & Architecture

### 1.1 Remove Tailwind & Configure SCSS
- Remove Tailwind CSS and related dependencies
- Install and configure Sass/SCSS
- Set up the specified folder structure

### 1.2 Design System Foundation
- Create `_variables.scss` with exact color palette (#213F7D, #39CDCC, etc.)
- Create `_mixins.scss` with reusable patterns (flex-center, card, respond-to)
- Set up `global.scss` with base styles and typography (Work Sans font)

### 1.3 Asset Setup
- Copy the Lendsqr logo and login illustration assets
- Copy the mock users JSON data (500 users)

---

## Phase 2: Login Page

### Features
- Split-screen layout (illustration left, form right)
- Lendsqr branding and colorful illustration
- "Welcome!" heading with subtext
- Email input field with validation
- Password field with SHOW/HIDE toggle
- "FORGOT PASSWORD?" link
- Full-width "LOG IN" button
- Mobile responsive (stacks vertically, hides illustration)

### Behavior
- Form validation (required fields, email format)
- Navigate to dashboard on successful login
- Store auth state in localStorage

---

## Phase 3: Layout Components

### 3.1 Header Component
- Lendsqr logo (left side)
- Search bar with cyan search button
- "Docs" link
- Notification bell icon
- User avatar with "Adedeji" dropdown

### 3.2 Sidebar Component (250px width)
- "Switch Organization" dropdown
- Dashboard link
- **CUSTOMERS section:** Users (active), Guarantors, Loans, Decision Models, Savings, Loan Requests, Whitelist, Karma
- **BUSINESSES section:** Organization, Loan Products, Savings Products, Fees and Charges, Transactions, Services, Service Account, Settlements, Reports
- **SETTINGS section:** Preferences, Fees and Pricing, Audit Logs, Systems Messages
- Logout link and version number (v1.2.0)
- Mobile hamburger menu support

---

## Phase 4: Dashboard/Users Page

### 4.1 Statistics Cards Row
- 4 cards with colored icons: USERS (purple), ACTIVE USERS (blue), USERS WITH LOANS (orange), USERS WITH SAVINGS (pink)
- Card styling with shadows and rounded corners

### 4.2 Filter Panel (Dropdown)
- Organization dropdown
- Username text input
- Email text input
- Date picker
- Phone Number input
- Status dropdown (Active, Inactive, Pending, Blacklisted)
- Reset and Filter buttons

### 4.3 Users Table
- Columns: ORGANIZATION, USERNAME, EMAIL, PHONE NUMBER, DATE JOINED, STATUS
- Column headers with filter icons
- Status badges with color coding:
  - Active: Green (#39CD62)
  - Inactive: Gray (#545F7D)
  - Pending: Yellow (#E9B200)
  - Blacklisted: Red (#E4033B)
- 3-dot action menu per row

### 4.4 Action Menu
- View Details (navigates to user details)
- Blacklist User
- Activate User

### 4.5 Pagination
- "Showing X out of Y" with per-page dropdown (10, 25, 50, 100)
- Page number buttons (1, 2, 3, ..., 15, 16)
- Previous/Next navigation arrows

---

## Phase 5: User Details Page

### 5.1 Page Header
- "← Back to Users" navigation link
- "User Details" title
- "BLACKLIST USER" button (red outline)
- "ACTIVATE USER" button (cyan outline)

### 5.2 User Summary Card
- Large circular avatar placeholder
- User name and ID
- User tier with star rating
- Account balance (₦ format)
- Bank account info

### 5.3 Tab Navigation
- General Details (active by default)
- Documents, Bank Details, Loans, Savings, App and System tabs

### 5.4 General Details Content
- **Personal Information:** Full Name, Phone Number, Email Address, BVN, Gender, Marital Status, Children, Type of Residence
- **Education and Employment:** Level of Education, Employment Status, Sector of Employment, Duration, Office Email, Monthly Income, Loan Repayment
- **Socials:** Twitter, Facebook, Instagram
- **Guarantor:** Full Name, Phone Number, Email Address, Relationship

---

## Phase 6: Data & Services Layer

### 6.1 Mock Data Integration
- Load 500 users from the provided JSON file
- Store in localStorage for persistence

### 6.2 API Service Functions
- `getUsers()` - Fetch all users
- `getUserById(id)` - Fetch single user
- `filterUsers(filters)` - Apply filters
- `paginateUsers(page, perPage)` - Handle pagination

### 6.3 LocalStorage Service
- Persist user data
- Save/restore filter state
- Save pagination preferences
- Handle blacklist/activate status changes

---

## Phase 7: TypeScript & Quality

### 7.1 Type Definitions
- `User` interface with all fields (personal info, education, socials, guarantor)
- `FilterParams` interface
- `LoginFormData` interface

### 7.2 Form Validation
- Email format validation
- Required field validation
- Error state handling

---

## Phase 8: Responsive Design

### Breakpoints
- **Mobile (≤768px):** Hamburger sidebar, stacked layouts, horizontal table scroll
- **Tablet (768px-1024px):** Adjusted grids, optimized spacing
- **Desktop (≥1024px):** Full layout with sidebar

### Mobile Optimizations
- Collapsible sidebar with hamburger menu
- Stacked statistics cards
- Touch-friendly action menus
- Responsive table with horizontal scroll

---

## Key Deliverables

✅ 4 fully functional pages matching the mockups  
✅ Pure SCSS styling with exact design tokens  
✅ 500 mock users with filtering & pagination  
✅ LocalStorage persistence for user data  
✅ Mobile-responsive design  
✅ TypeScript throughout  
✅ Clean component architecture

