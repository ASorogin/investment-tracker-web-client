// src/components/dashboard/screens/Investments.js
import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import '../styles/investmentStyles.css';
import '../styles/investmentfillerStlyles.css';
import { InvestmentModal } from './InvestmentModal';

export const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    assetType: '',
    status: ''
  });
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showModal, setShowModal] = useState(false);
 
  const fetchInvestments = async () => {
    try {
      const { data } = await api.get('/investments', { params: filters });
      setInvestments(data.data.investments);
      setSummary(data.data.summary);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch investments');
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchInvestments();
  }, [filters]);
 
  const handleCreate = async (formData) => {
    try {
      await api.post('/investments', formData);
      fetchInvestments();
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create investment');
    }
  };
 
  const handleUpdate = async (formData) => {
    try {
      await api.put(`/investments/${selectedInvestment._id}`, formData);
      fetchInvestments();
      setShowModal(false);
      setSelectedInvestment(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update investment');
    }
  };
 
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      try {
        await api.delete(`/investments/${id}`);
        fetchInvestments();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete investment');
      }
    }
  };
 
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
 
  return (
    <div className="investments-container">
      <div className="investments-header">
        <h2>Investment Portfolio</h2>
        <div className="header-actions">
          <div className="filters">
            <select 
              value={filters.assetType}
              onChange={(e) => setFilters({...filters, assetType: e.target.value})}
            >
              <option value="">All Asset Types</option>
              <option value="stocks">Stocks</option>
              <option value="bonds">Bonds</option>
              <option value="crypto">Crypto</option>
              <option value="real_estate">Real Estate</option>
              <option value="commodities">Commodities</option>
            </select>
 
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button 
            className="btn-add"
            onClick={() => setShowModal(true)}
          >
            Add Investment
          </button>
        </div>
      </div>
 
      {summary && (
        <div className="summary-section">
          <div className="summary-card">
            <h3>Total Investments</h3>
            <p>{summary.totalInvestments}</p>
          </div>
          <div className="summary-card">
            <h3>Total Value</h3>
            <p>${summary.totalValue.toLocaleString()}</p>
          </div>
          <div className="summary-card">
            <h3>Total Profit/Loss</h3>
            <p className={summary.totalProfit >= 0 ? 'profit' : 'loss'}>
              ${Math.abs(summary.totalProfit).toLocaleString()}
            </p>
          </div>
          <div className="summary-card">
            <h3>Average ROI</h3>
            <p className={summary.averageROI >= 0 ? 'profit' : 'loss'}>
              {summary.averageROI.toFixed(2)}%
            </p>
          </div>
        </div>
      )}
 
      <div className="investments-grid">
        {investments.map((investment) => (
          <div key={investment.symbol} className="investment-card">
            <div className="card-header">
              <h3>{investment.symbol || 'N/A'}</h3>
              <span className={`status ${investment.status}`}>
                {investment.status}
              </span>
            </div>
            <div className="card-body">
              <div className="info-row">
                <span>Type:</span>
                <span>{investment.assetType}</span>
              </div>
              <div className="info-row">
                <span>Amount:</span>
                <span>{investment.totalAmount}</span>
              </div>
              <div className="info-row">
                <span>Value:</span>
                <span>${investment.totalValue.toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span>ROI:</span>
                <span className={investment.ROI >= 0 ? 'profit' : 'loss'}>
                  {investment.ROI.toFixed(2)}%
                </span>
              </div>
              <div className="card-actions">
                <button
                  onClick={() => {
                    setSelectedInvestment(investment.positions[0]);
                    setShowModal(true);
                  }}
                  className="btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(investment.positions[0]._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
 
      {showModal && (
        <InvestmentModal
          investment={selectedInvestment}
          onClose={() => {
            setShowModal(false);
            setSelectedInvestment(null);
          }}
          onSubmit={selectedInvestment ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
 };