// Auth Context - Member 1
// TODO: Implement authentication context with user state, login, logout methods

import { createContext } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
