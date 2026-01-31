import type { User, FilterParams, UserStatus } from '../types';
import { getStoredUsers, saveUsers } from './storage';
import mockUsersData from '../data/mock-users.json';

// Initialize users from mock data or localStorage
export const initializeUsers = (): User[] => {
  let users = getStoredUsers();
  
  if (!users || users.length === 0) {
    users = mockUsersData as User[];
    saveUsers(users);
  }
  
  return users;
};

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return initializeUsers();
};

// Fetch single user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const users = initializeUsers();
  return users.find((u) => u.id === id) || null;
};

// Filter users
export const filterUsers = (users: User[], filters: FilterParams): User[] => {
  return users.filter((user) => {
    if (filters.organization && !user.orgName.toLowerCase().includes(filters.organization.toLowerCase())) {
      return false;
    }
    if (filters.username && !user.userName.toLowerCase().includes(filters.username.toLowerCase())) {
      return false;
    }
    if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
      return false;
    }
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) {
      return false;
    }
    if (filters.status && user.status !== filters.status) {
      return false;
    }
    if (filters.date) {
      // Simple date matching - could be enhanced for range filtering
      const filterDate = new Date(filters.date).toDateString();
      const userDate = new Date(user.dateJoined).toDateString();
      if (filterDate !== userDate) {
        return false;
      }
    }
    return true;
  });
};

// Paginate users
export const paginateUsers = (users: User[], page: number, perPage: number): User[] => {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return users.slice(start, end);
};

// Update user status
export const updateUserStatus = async (userId: string, status: UserStatus): Promise<User | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const users = initializeUsers();
  const index = users.findIndex((u) => u.id === userId);
  
  if (index === -1) return null;
  
  users[index].status = status;
  saveUsers(users);
  
  return users[index];
};

// Get unique organizations from users
export const getOrganizations = (): string[] => {
  const users = initializeUsers();
  const orgs = new Set(users.map((u) => u.orgName));
  return Array.from(orgs).sort();
};

// Get statistics
export const getStatistics = () => {
  const users = initializeUsers();
  
  return {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === 'Active').length,
    usersWithLoans: Math.floor(users.length * 0.25), // Simulated
    usersWithSavings: Math.floor(users.length * 0.20), // Simulated
  };
};
