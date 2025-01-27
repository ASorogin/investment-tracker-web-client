// src/components/dashboard/screens/Analytics.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';
import '../styles/analyticsStyles.css';

export const Analytics = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        let response;
        if (user.role === 'admin') {
          response = await api.get('/admin/stats');
        } else if (user.role === 'subscriber') {
          response = await api.get('/subscriber/tracking');
        }
        
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user.role]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!data) return <div className="error">No data available</div>;

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Analytics Dashboard</h2>
      </div>

      {user.role === 'admin' ? (
        <div className="stats-grid">
          <div className="stats-section">
            <h3>User Statistics</h3>
            <div className="stats-cards">
              <div className="stat-card">
                <h4>Total Users</h4>
                <p>{data.users?.total || 0}</p>
              </div>
              <div className="stat-card">
                <h4>Subscribers</h4>
                <p>{data.users?.subscribers || 0}</p>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h3>Investment Statistics</h3>
            <div className="stats-cards">
              <div className="stat-card">
                <h4>Total Investments</h4>
                <p>{data.investments?.total || 0}</p>
              </div>
              <div className="stat-card">
                <h4>Total Value</h4>
                <p>${(data.investments?.totalValue || 0).toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h4>Average ROI</h4>
                <p className={data.investments?.averageROI >= 0 ? 'profit' : 'loss'}>
                  {(data.investments?.averageROI || 0).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="stats-grid">
          <div className="stats-section">
            <h3>Your Investment Analytics</h3>
            <div className="stats-cards">
              <div className="stat-card">
                <h4>Total Investments</h4>
                <p>{data.totalInvestments || 0}</p>
              </div>
              <div className="stat-card">
                <h4>Total Value</h4>
                <p>${(data.totalValue || 0).toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <h4>Average Amount</h4>
                <p>${(data.averageAmount || 0).toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h4>Average ROI</h4>
                <p className={(data.averageROI || 0) >= 0 ? 'profit' : 'loss'}>
                  {(data.averageROI || 0).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {data.assetTypeDistribution && (
            <div className="stats-section">
              <h3>Asset Distribution</h3>
              <div className="distribution-grid">
                {Object.entries(data.assetTypeDistribution).map(([type, count]) => (
                  <div key={type} className="distribution-item">
                    <span className="asset-type">{type}</span>
                    <span className="asset-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};