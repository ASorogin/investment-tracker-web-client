// src/components/dashboard/screens/components/InvestmentModal.js
import React, { useState, useEffect } from 'react';
import '../styles/addinvestmentStyles.css';

export const InvestmentModal = ({ investment, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      symbol: '',
      assetType: 'stocks',
      amount: '',
      purchasePrice: '',
      currentPrice: '',
      notes: ''
    });
  
    useEffect(() => {
      if (investment) {
        setFormData(investment);
      }
    }, [investment]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>{investment ? 'Edit Investment' : 'Add Investment'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Symbol</label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Asset Type</label>
              <select
                value={formData.assetType}
                onChange={(e) => setFormData({...formData, assetType: e.target.value})}
                required
              >
                <option value="stocks">Stocks</option>
                <option value="bonds">Bonds</option>
                <option value="crypto">Crypto</option>
                <option value="real_estate">Real Estate</option>
                <option value="commodities">Commodities</option>
              </select>
            </div>
  
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Purchase Price</label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({...formData, purchasePrice: Number(e.target.value)})}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Current Price</label>
              <input
                type="number"
                value={formData.currentPrice || ''}
                onChange={(e) => setFormData({...formData, currentPrice: Number(e.target.value)})}
              />
            </div>
  
            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                maxLength={500}
              />
            </div>
  
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                {investment ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };