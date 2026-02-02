import { describe, it, expect, beforeEach } from 'vitest';
import { getUsers, getUserById, filterUsers, paginateUsers } from './api';
import type { User, FilterParams } from '../types';

describe('API Service', () => {
  let users: User[];

  beforeEach(async () => {
    users = await getUsers();
  });

  describe('getUsers', () => {
    it('should return array of users', async () => {
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
    });

    it('should return users with correct structure', async () => {
      const user = users[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('userName');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('status');
    });
  });

  describe('getUserById', () => {
    it('should return user by valid ID', async () => {
      const user = await getUserById(users[0].id);
      expect(user).not.toBeNull();
      expect(user?.id).toBe(users[0].id);
    });

    it('should return null for invalid ID', async () => {
      const user = await getUserById('invalid-id-12345');
      expect(user).toBeNull();
    });
  });

  describe('filterUsers', () => {
    it('should filter by organization', () => {
      const filters: FilterParams = { organization: users[0].orgName };
      const filtered = filterUsers(users, filters);
      expect(filtered.every(u => u.orgName === users[0].orgName)).toBe(true);
    });

    it('should filter by status', () => {
      const filters: FilterParams = { status: 'Active' };
      const filtered = filterUsers(users, filters);
      expect(filtered.every(u => u.status === 'Active')).toBe(true);
    });

    it('should filter by multiple criteria', () => {
      const filters: FilterParams = { 
        status: 'Active',
        organization: users[0].orgName 
      };
      const filtered = filterUsers(users, filters);
      expect(filtered.every(u => 
        u.status === 'Active' && u.orgName === users[0].orgName
      )).toBe(true);
    });

    it('should return empty array when no matches', () => {
      const filters: FilterParams = { email: 'nonexistent@test.com' };
      const filtered = filterUsers(users, filters);
      expect(filtered).toHaveLength(0);
    });
  });

  describe('paginateUsers', () => {
    it('should return correct number of users per page', () => {
      const paginated = paginateUsers(users, 1, 10);
      expect(paginated).toHaveLength(10);
    });

    it('should return correct page', () => {
      const page2 = paginateUsers(users, 2, 10);
      expect(page2[0]).toEqual(users[10]);
    });

    it('should handle last page correctly', () => {
      const lastPage = paginateUsers(users, Math.ceil(users.length / 10), 10);
      expect(lastPage.length).toBeLessThanOrEqual(10);
    });
  });
});
