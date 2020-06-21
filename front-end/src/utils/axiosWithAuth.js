import axios from 'axios';

export const axiosWithAuth = () => {
  let token = localStorage.getItem('chewyToken');

  const defaultOptions = {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };

  return {
    get: (url, options = {}) =>
      axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      axios.delete(url, { ...defaultOptions, ...options }),
  };
};
