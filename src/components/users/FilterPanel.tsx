import React, { useState } from 'react';
import type { FilterParams, UserStatus } from '../../types';

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

interface FilterPanelProps {
  filters: FilterParams;
  organizations: string[];
  onFilter: (filters: FilterParams) => void;
  onReset: () => void;
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, organizations, onFilter, onReset, onClose }) => {
  const [localFilters, setLocalFilters] = useState<FilterParams>(filters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
    onReset();
  };

  const statuses: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];

  return (
    <div className="filter-panel" onClick={(e) => e.stopPropagation()}>
      <div className="filter-header">
        <h3>Filter</h3>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="filter-grid">
          <div className="filter-input">
            <label>Organization</label>
            <select
              value={localFilters.organization || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, organization: e.target.value })}
            >
              <option value="">Select</option>
              {organizations.map((org) => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
          </div>

          <div className="filter-input">
            <label>Username</label>
            <input
              type="text"
              placeholder="User"
              value={localFilters.username || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, username: e.target.value })}
            />
          </div>

          <div className="filter-input">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={localFilters.email || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, email: e.target.value })}
            />
          </div>

          <div className="filter-input">
            <label>Date</label>
            <input
              type="date"
              value={localFilters.date || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, date: e.target.value })}
            />
          </div>

          <div className="filter-input">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              value={localFilters.phoneNumber || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, phoneNumber: e.target.value })}
            />
          </div>

          <div className="filter-input">
            <label>Status</label>
            <select
              value={localFilters.status || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value as UserStatus | '' })}
            >
              <option value="">Select</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-actions">
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="filter-btn">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPanel;
