import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Users from './Users';
import * as api from '../../services/api';

vi.mock('../../services/api');

const mockUsers = [
  {
    id: '1',
    userName: 'testuser',
    email: 'test@test.com',
    phoneNumber: '1234567890',
    orgName: 'Test Org',
    dateJoined: 'Jan 1, 2020',
    status: 'Active' as const,
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
      facebook: 'Test',
      instagram: '@test'
    },
    guarantor: {
      fullName: 'Guarantor',
      phoneNumber: '0987654321',
      emailAddress: 'guarantor@test.com',
      relationship: 'Friend'
    },
    accountBalance: '500000',
    accountNumber: '1234567890',
    bank: 'Test Bank'
  }
];

describe('Users Page', () => {
  it('renders users table', async () => {
    vi.mocked(api.getUsers).mockResolvedValue(mockUsers);
    vi.mocked(api.getStatistics).mockReturnValue({
      totalUsers: 1,
      activeUsers: 1,
      usersWithLoans: 0,
      usersWithSavings: 0
    });
    vi.mocked(api.getOrganizations).mockReturnValue(['Test Org']);
    vi.mocked(api.filterUsers).mockReturnValue(mockUsers);
    vi.mocked(api.paginateUsers).mockReturnValue(mockUsers);

    render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('test@test.com')).toBeInTheDocument();
    });
  });
});
