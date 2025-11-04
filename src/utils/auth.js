// utils/auth.js
// Gestion du token JWT admin dans le localStorage

export const setAdminToken = (token) => {
  localStorage.setItem('admin_jwt', token);
};

export const getAdminToken = () => {
  return localStorage.getItem('admin_jwt');
};

export const removeAdminToken = () => {
  localStorage.removeItem('admin_jwt');
};
