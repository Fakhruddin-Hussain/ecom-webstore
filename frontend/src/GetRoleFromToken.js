import jwt_decode from 'jwt-decode';

export default function GetRoleFromToken () {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded.role;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
};