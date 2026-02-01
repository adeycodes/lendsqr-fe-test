import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import StatCard from '../../components/common/StatCard';
import FilterPanel from '../../components/users/FilterPanel';
import Pagination from '../../components/users/Pagination';
import type { User, FilterParams, UserStatus } from '../../types';
import { getUsers, filterUsers, paginateUsers, getStatistics, updateUserStatus, getOrganizations } from '../../services/api';
import '../../styles/components/_stats.scss';
import '../../styles/components/_table.scss';
import '../../styles/components/_filters.scss';
import '../../styles/components/_pagination.scss';

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z" fill="#545F7D" />
  </svg>

);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UserXIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="18" y1="8" x2="23" y2="13" />
    <line x1="23" y1="8" x2="18" y2="13" />
  </svg>
);

const UserCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterParams>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [openFilterColumn, setOpenFilterColumn] = useState<string | null>(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });
  const [organizations, setOrganizations] = useState<string[]>([]);
  const headerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setOrganizations(getOrganizations());
      setLoading(false);
    };
    loadData();
  }, []);

  const stats = useMemo(() => getStatistics(), [users]);

  const filteredUsers = useMemo(() => {
    return filterUsers(users, filters);
  }, [users, filters]);

  const paginatedUsers = useMemo(() => {
    return paginateUsers(filteredUsers, currentPage, perPage);
  }, [filteredUsers, currentPage, perPage]);

  const totalPages = Math.ceil(filteredUsers.length / perPage);

  const handleFilterClick = (columnKey: string, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setFilterPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    });
    setOpenFilterColumn(openFilterColumn === columnKey ? null : columnKey);
  };

  const handleFilter = (newFilters: FilterParams) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setOpenFilterColumn(null);
  };

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
    setOpenFilterColumn(null);
  };

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
    setOpenMenuId(null);
  };

  const handleBlacklist = async (userId: string) => {
    await updateUserStatus(userId, 'Blacklisted');
    const data = await getUsers();
    setUsers(data);
    setOpenMenuId(null);
  };

  const handleActivate = async (userId: string) => {
    await updateUserStatus(userId, 'Active');
    const data = await getUsers();
    setUsers(data);
    setOpenMenuId(null);
  };

  const getStatusClass = (status: UserStatus): string => {
    return status.toLowerCase();
  };

  const columns = [
    { key: 'orgName', label: 'Organization' },
    { key: 'userName', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'dateJoined', label: 'Date Joined' },
    { key: 'status', label: 'Status' },
  ];

  if (loading) {
    return (
      <Layout>
        <h1 className="page-title">Users</h1>
        <div className="stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card" style={{ opacity: 0.5 }}>
              <div className="icon purple" />
              <div className="label">Loading...</div>
              <div className="value">--</div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="page-title">Users</h1>

      <div className="stats-grid">
        <StatCard label="Users" value={stats.totalUsers} colorClass="purple" />
        <StatCard label="Active Users" value={stats.activeUsers} colorClass="blue" />
        <StatCard label="Users with Loans" value={stats.usersWithLoans} colorClass="orange" />
        <StatCard label="Users with Savings" value={stats.usersWithSavings} colorClass="pink" />
      </div>

      <div className="table-container" style={{ position: 'relative' }}>
        <table className="users-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>
                  <div
                    ref={(el) => (headerRefs.current[col.key] = el)}
                    className="header-content"
                    onClick={(e) => handleFilterClick(col.key, e)}
                  >
                    {col.label}
                    <FilterIcon />
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <h3>No users found</h3>
                    <p>Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.orgName}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.dateJoined}</td>
                  <td className="status">
                    <span className={`status-badge ${getStatusClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="action-trigger"
                      onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                    >
                      <MoreIcon />
                    </button>
                    {openMenuId === user.id && (
                      <div className="action-dropdown">
                        <button className="action-item" onClick={() => handleViewDetails(user.id)}>
                          <EyeIcon />
                          View Details
                        </button>
                        <button className="action-item" onClick={() => handleBlacklist(user.id)}>
                          <UserXIcon />
                          Blacklist User
                        </button>
                        <button className="action-item" onClick={() => handleActivate(user.id)}>
                          <UserCheckIcon />
                          Activate User
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Filter Panel - Rendered outside table */}
        {openFilterColumn && (
          <div style={{
            position: 'absolute',
            top: `${filterPosition.top - window.scrollY}px`,
            left: `${filterPosition.left - (document.querySelector('.table-container')?.getBoundingClientRect().left || 0)}px`,
            zIndex: 200
          }}>
            <FilterPanel
              filters={filters}
              organizations={organizations}
              onFilter={handleFilter}
              onReset={handleResetFilters}
              onClose={() => setOpenFilterColumn(null)}
            />
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
          totalItems={filteredUsers.length}
          onPageChange={setCurrentPage}
          onPerPageChange={(newPerPage) => {
            setPerPage(newPerPage);
            setCurrentPage(1);
          }}
        />
      </div>
    </Layout>
  );
};

export default Users;