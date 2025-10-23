// useAuth Hook - Member 1
// TODO: Implement hook to access AuthContext

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
