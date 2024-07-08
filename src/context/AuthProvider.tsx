import React, { createContext, useState, useContext } from "react";

// Define el tipo de los datos del usuario
type User = {
  _id: string;
  email: string;
  // Otras propiedades del usuario según sea necesario
};

// Define el tipo del contexto
type AuthContextType = {
  user: User | null; // Cambia 'credentials' a 'user'
  login: (user: User) => void; // Actualiza el tipo del argumento de login
  logout: () => void;
};

// Crea el contexto de autenticación
const AuthContext = createContext<AuthContextType>({
  user: null, // Cambia 'credentials' a 'user'
  login: () => { },
  logout: () => { },
});

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Dentro del componente AuthProvider
  const [user, setUser] = useState<User | null>(null); // Cambia 'credentials' a 'user'

  // Dentro del componente AuthProvider
  const login = (user: User) => {
    setUser(user); // Actualiza el estado con el objeto completo del usuario
  };

  // Dentro del componente AuthProvider
  const logout = () => {
    setUser(null); // Restablece el estado a null al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};
