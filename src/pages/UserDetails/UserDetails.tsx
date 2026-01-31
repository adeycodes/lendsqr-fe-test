import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import type { User } from '../../types';
import { getUserById } from '../../services/api';
import { updateUserStatus } from '../../services/api';
import '../../styles/components/_userdetails.scss';

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const StarFilled = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="filled">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const StarEmpty = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="empty">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      setLoading(true);
      const userData = await getUserById(id);
      setUser(userData);
      setLoading(false);
    };
    loadUser();
  }, [id]);

  const handleBlacklist = async () => {
    if (!user || !id) return;
    await updateUserStatus(id, 'Blacklisted');
    const updated = await getUserById(id);
    setUser(updated);
  };

  const handleActivate = async () => {
    if (!user || !id) return;
    await updateUserStatus(id, 'Active');
    const updated = await getUserById(id);
    setUser(updated);
  };

  const tabs = [
    { id: 'general', label: 'General Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'bank', label: 'Bank Details' },
    { id: 'loans', label: 'Loans' },
    { id: 'savings', label: 'Savings' },
    { id: 'app', label: 'App and System' },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="user-details-page">
          <a href="/users" className="back-link">
            <ArrowLeftIcon />
            Back to Users
          </a>
          <div className="page-header">
            <h1>User Details</h1>
          </div>
          <div className="user-summary">
            <div className="summary-top">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="user-details-page">
          <a href="/users" className="back-link" onClick={(e) => { e.preventDefault(); navigate('/users'); }}>
            <ArrowLeftIcon />
            Back to Users
          </a>
          <div className="page-header">
            <h1>User Details</h1>
          </div>
          <div className="user-summary">
            <div className="summary-top">
              <p>User not found</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="user-details-page">
        <a href="/users" className="back-link" onClick={(e) => { e.preventDefault(); navigate('/users'); }}>
          <ArrowLeftIcon />
          Back to Users
        </a>

        <div className="page-header">
          <h1>User Details</h1>
          <div className="actions">
            <button className="blacklist-btn" onClick={handleBlacklist}>
              Blacklist User
            </button>
            <button className="activate-btn" onClick={handleActivate}>
              Activate User
            </button>
          </div>
        </div>

        <div className="user-summary">
          <div className="summary-top">
            <div className="user-avatar">
              <UserIcon />
            </div>
            <div className="user-info">
              <div className="name">{user.personalInfo.fullName}</div>
              <div className="user-id">{user.id}</div>
            </div>
            <div className="user-tier">
              <div className="tier-label">User's Tier</div>
              <div className="stars">
                <StarFilled />
                <StarEmpty />
                <StarEmpty />
              </div>
            </div>
            <div className="account-info">
              <div className="balance">{user.accountBalance}</div>
              <div className="bank">{user.accountNumber}/{user.bank}</div>
            </div>
          </div>
        </div>

        <div className="user-tabs">
          <div className="tabs-list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'general' && (
          <>
            <div className="details-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="label">Full Name</div>
                  <div className="value">{user.personalInfo.fullName}</div>
                </div>
                <div className="info-item">
                  <div className="label">Phone Number</div>
                  <div className="value">{user.personalInfo.phoneNumber}</div>
                </div>
                <div className="info-item">
                  <div className="label">Email Address</div>
                  <div className="value">{user.personalInfo.emailAddress}</div>
                </div>
                <div className="info-item">
                  <div className="label">BVN</div>
                  <div className="value">{user.personalInfo.bvn}</div>
                </div>
                <div className="info-item">
                  <div className="label">Gender</div>
                  <div className="value">{user.personalInfo.gender}</div>
                </div>
                <div className="info-item">
                  <div className="label">Marital Status</div>
                  <div className="value">{user.personalInfo.maritalStatus}</div>
                </div>
                <div className="info-item">
                  <div className="label">Children</div>
                  <div className="value">{user.personalInfo.children}</div>
                </div>
                <div className="info-item">
                  <div className="label">Type of Residence</div>
                  <div className="value">{user.personalInfo.typeOfResidence}</div>
                </div>
              </div>

              <div className="divider" />

              <h3 className="section-title">Education and Employment</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="label">Level of Education</div>
                  <div className="value">{user.education.level}</div>
                </div>
                <div className="info-item">
                  <div className="label">Employment Status</div>
                  <div className="value">{user.education.employmentStatus}</div>
                </div>
                <div className="info-item">
                  <div className="label">Sector of Employment</div>
                  <div className="value">{user.education.sector}</div>
                </div>
                <div className="info-item">
                  <div className="label">Duration of Employment</div>
                  <div className="value">{user.education.duration}</div>
                </div>
                <div className="info-item">
                  <div className="label">Office Email</div>
                  <div className="value">{user.education.officeEmail}</div>
                </div>
                <div className="info-item">
                  <div className="label">Monthly Income</div>
                  <div className="value">{user.education.monthlyIncome.join(' - ')}</div>
                </div>
                <div className="info-item">
                  <div className="label">Loan Repayment</div>
                  <div className="value">{user.education.loanRepayment}</div>
                </div>
              </div>

              <div className="divider" />

              <h3 className="section-title">Socials</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="label">Twitter</div>
                  <div className="value">{user.socials.twitter}</div>
                </div>
                <div className="info-item">
                  <div className="label">Facebook</div>
                  <div className="value">{user.socials.facebook}</div>
                </div>
                <div className="info-item">
                  <div className="label">Instagram</div>
                  <div className="value">{user.socials.instagram}</div>
                </div>
              </div>

              <div className="divider" />

              <h3 className="section-title">Guarantor</h3>
              <div className="info-grid">
                <div className="info-item">
                  <div className="label">Full Name</div>
                  <div className="value">{user.guarantor.fullName}</div>
                </div>
                <div className="info-item">
                  <div className="label">Phone Number</div>
                  <div className="value">{user.guarantor.phoneNumber}</div>
                </div>
                <div className="info-item">
                  <div className="label">Email Address</div>
                  <div className="value">{user.guarantor.emailAddress}</div>
                </div>
                <div className="info-item">
                  <div className="label">Relationship</div>
                  <div className="value">{user.guarantor.relationship}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab !== 'general' && (
          <div className="details-section">
            <h3 className="section-title">{tabs.find(t => t.id === activeTab)?.label}</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="value">No data available</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDetails;
