import { describe, it, expect, beforeEach } from 'vitest';
import { saveUsers, getStoredUsers, saveFilters, getStoredFilters, clearFilters } from './storage';
import type { User, FilterParams } from '../types';

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('User Storage', () => {
    const mockUsers: User[] = [
      {
        id: 'test-1',
        userName: 'testuser',
        email: 'test@test.com',
        phoneNumber: '1234567890',
        orgName: 'Test Org',
        dateJoined: '2020-01-01',
        status: 'Active',
        personalInfo: {
          fullName: 'Test User',
          phoneNumber: '1234567890',
          emailAddress: 'test@test.com',
          bvn: '12345678',
          gender: 'Male',
          maritalStatus: 'Single',
          children: '0',
          typeOfResidence: 'Apartment'
        },
        education: {
          level: 'BSc',
          employmentStatus: 'Employed',
          sector: 'Tech',
          duration: '2 years',
          officeEmail: 'test@company.com',
          monthlyIncome: ['100000', '200000'],
          loanRepayment: '50000'
        },
        socials: {
          twitter: '@test',
          facebook: 'Test User',
          instagram: '@test'
        },
        guarantor: {
          fullName: 'Guarantor Name',
          phoneNumber: '0987654321',
          emailAddress: 'guarantor@test.com',
          relationship: 'Friend'
        },
        accountBalance: '500000',
        accountNumber: '1234567890',
        bank: 'Test Bank'
      }
    ];

    it('should save and retrieve users', () => {
      saveUsers(mockUsers);
      const retrieved = getStoredUsers();
      expect(retrieved).toEqual(mockUsers);
    });

    it('should return null when no users stored', () => {
      const retrieved = getStoredUsers();
      expect(retrieved).toBeNull();
    });
  });

  describe('Filter Storage', () => {
    const mockFilters: FilterParams = {
      organization: 'Test Org',
      status: 'Active'
    };

    it('should save and retrieve filters', () => {
      saveFilters(mockFilters);
      const retrieved = getStoredFilters();
      expect(retrieved).toEqual(mockFilters);
    });

    it('should clear filters', () => {
      saveFilters(mockFilters);
      clearFilters();
      const retrieved = getStoredFilters();
      expect(retrieved).toBeNull();
    });
  });
});
