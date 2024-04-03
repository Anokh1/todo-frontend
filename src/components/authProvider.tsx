import React, { createContext, useContext, useState, ReactNode } from 'react';
export {};

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  // Add other relevant user properties
}

// Define the context type
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context with initial values
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

// Define the props object type for AuthProvider
interface AuthProviderProps {
  children: ReactNode; // ReactNode is a type that represents any JSX element
}

// AuthProvider component to wrap your application
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
