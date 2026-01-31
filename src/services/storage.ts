import type { User, FilterParams, PaginationState } from '../types';

const STORAGE_KEYS = {
  USERS: 'lendsqr_users',
  FILTERS: 'lendsqr_filters',
  PAGINATION: 'lendsqr_pagination',
  AUTH: 'lendsqr_auth',
};

// Users
export const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getStoredUsers = (): User[] | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : null;
};

export const updateUser = (userId: string, updates: Partial<User>): User | null => {
  const users = getStoredUsers();
  if (!users) return null;
  
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  return users[index];
};

export const getUserById = (id: string): User | null => {
  const users = getStoredUsers();
  if (!users) return null;
  return users.find((u) => u.id === id) || null;
};

// Filters
export const saveFilters = (filters: FilterParams): void => {
  localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
};

export const getStoredFilters = (): FilterParams | null => {
  const data = localStorage.getItem(STORAGE_KEYS.FILTERS);
  return data ? JSON.parse(data) : null;
};

export const clearFilters = (): void => {
  localStorage.removeItem(STORAGE_KEYS.FILTERS);
};

// Pagination
export const savePagination = (pagination: PaginationState): void => {
  localStorage.setItem(STORAGE_KEYS.PAGINATION, JSON.stringify(pagination));
};

export const getStoredPagination = (): PaginationState | null => {
  const data = localStorage.getItem(STORAGE_KEYS.PAGINATION);
  return data ? JSON.parse(data) : null;
};

// Auth
export const saveAuth = (isAuthenticated: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ isAuthenticated }));
};

export const getAuth = (): boolean => {
  const data = localStorage.getItem(STORAGE_KEYS.AUTH);
  if (!data) return false;
  try {
    return JSON.parse(data).isAuthenticated;
  } catch {
    return false;
  }
};

export const clearAuth = (): void => {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
};
