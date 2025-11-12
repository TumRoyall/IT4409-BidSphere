import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import './Settings.css';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: '1xBid',
    email: 'admin@1xbid.com',
    bidStepAmount: '10000',
    depositRequired: 'true',
    autoApprove: 'false',
  });

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    alert('Settings saved!');
  };

  return (
    <AdminLayout>
      <div className="settings-page">
        <div className="page-header">
          <h1>Settings</h1>
        </div>

        <div className="settings-container">
          <div className="settings-section">
            <h3>General Settings</h3>
            <div className="setting-item">
              <label>Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
              />
            </div>
            <div className="setting-item">
              <label>Admin Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="settings-section">
            <h3>Auction Settings</h3>
            <div className="setting-item">
              <label>Default Bid Step Amount (VND)</label>
              <input
                type="number"
                value={settings.bidStepAmount}
                onChange={(e) => handleChange('bidStepAmount', e.target.value)}
              />
            </div>
            <div className="setting-item">
              <label>Require Deposit</label>
              <select
                value={settings.depositRequired}
                onChange={(e) => handleChange('depositRequired', e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Auto Approve Products</label>
              <select
                value={settings.autoApprove}
                onChange={(e) => handleChange('autoApprove', e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="settings-actions">
            <button className="btn-save" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;