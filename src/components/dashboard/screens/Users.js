// src/components/dashboard/screens/Users.js
import React, { useState, useEffect } from 'react';
import api from '../../../api/axios';
import '../styles/userStyles.css';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    page: 1,
    limit: 10
  });

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users', { params: filters });
      setUsers(data.data.users);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}`, { role: newRole });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleStatusUpdate = async (userId, isActive) => {
    try {
      await api.put(`/admin/users/${userId}`, { isActive });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user status');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <div className="filters">
          <select
            value={filters.role}
            onChange={(e) => setFilters({...filters, role: e.target.value})}
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="subscriber">Subscriber</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                    className="role-select"
                  >
                    <option value="user">User</option>
                    <option value="subscriber">Subscriber</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={user.isActive}
                      onChange={(e) => handleStatusUpdate(user._id, e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>
                <td>{new Date(user.lastLogin).toLocaleString()}</td>
                <td>
                  <button
                    className="btn-reset"
                    onClick={() => handleStatusUpdate(user._id, true)}
                  >
                    Reset Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};