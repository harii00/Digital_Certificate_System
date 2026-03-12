import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const authAPI = {
  login: async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return res.data;
  },

  logout: async () => {
    const res = await axios.post(`${API_BASE}/auth/logout`);
    return res.data;
  },

  register: async (userData) => {
    const res = await axios.post(`${API_BASE}/auth/register`, userData);
    return res.data;
  },
};

export const certificateAPI = {
  issue: async (data) => {
    const res = await axios.post(`${API_BASE}/certificates`, data, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  getAll: async (params) => {
    const res = await axios.get(`${API_BASE}/certificates`, { params });
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_BASE}/certificates/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  getStudentCertificates: async () => {
    const res = await axios.get(`${API_BASE}/certificates/my-certificates`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  verify: async (certId) => {
    const res = await axios.get(`${API_BASE}/certificates/verify/${certId}`);
    return res.data;
  },

  updateStatus: async (id, status) => {
    const res = await axios.patch(`${API_BASE}/certificates/${id}/status`, { status }, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_BASE}/certificates/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  downloadUrl: (id) => {
    return `${API_BASE}/certificates/${id}/download`;
  },

  download: async (id, certificateId) => {
    const res = await axios.get(`${API_BASE}/certificates/${id}/download`, {
      headers: getAuthHeaders(),
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${certificateId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  getRanking: async () => {
    const res = await axios.get(`${API_BASE}/certificates/ranking`);
    return res.data;
  },
};

export const userAPI = {
  getProfile: async () => {
    const res = await axios.get(`${API_BASE}/users/profile`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },
  updateProfile: async (data) => {
    const res = await axios.put(`${API_BASE}/users/profile`, data, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },
};

export const studentAPI = {
  getAll: async () => {
    const res = await axios.get(`${API_BASE}/users/students`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  getById: async (id) => {
    const res = await axios.get(`${API_BASE}/users/students/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  create: async (data) => {
    const res = await axios.post(`${API_BASE}/users/students`, data, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  update: async (id, data) => {
    const res = await axios.put(`${API_BASE}/users/students/${id}`, data, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_BASE}/users/students/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },
};
