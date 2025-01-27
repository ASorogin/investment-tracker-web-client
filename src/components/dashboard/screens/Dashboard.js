// src/components/dashboard/screens/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../api/axios';
import '../styles/dashboardStyles.css';

export const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get('/investments');
        setSummary(data.data.summary);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch summary');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name}!</h2>
        <p className="header-subtitle">Here's your investment summary</p>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <h3>Total Investments</h3>
          <p className="summary-value">{summary.totalInvestments}</p>
        </div>

        <div className="summary-card">
          <h3>Portfolio Value</h3>
          <p className="summary-value">
            ${summary.totalValue.toLocaleString()}
          </p>
        </div>

        <div className="summary-card">
          <h3>Total Profit/Loss</h3>
          <p className={`summary-value ${summary.totalProfit >= 0 ? 'profit' : 'loss'}`}>
            ${Math.abs(summary.totalProfit).toLocaleString()}
            <span className="profit-indicator">
              {summary.totalProfit >= 0 ? '↑' : '↓'}
            </span>
          </p>
        </div>

        <div className="summary-card">
          <h3>Average ROI</h3>
          <p className={`summary-value ${summary.averageROI >= 0 ? 'profit' : 'loss'}`}>
            {summary.averageROI.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};