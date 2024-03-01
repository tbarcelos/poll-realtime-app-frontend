import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { login, register } from '../services/auth';
import { decodeToken } from '../utils/jwtDecode';

interface UserState {
  userId: number;
  username: string;
  accessToken: string;
}

interface AuthContextType {
  user: UserState | null;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserState | null>(null);

  const doLogin = async (username: string, password: string) => {
    const response = await login({ username, password });
    if (response) {
      const payload = decodeToken(response.accessToken);

      if (!payload) throw new Error('Invalid Acesstoken');

      const userState = {
        userId: payload?.userId,
        username: payload?.username,
        accessToken: response.accessToken,
      };

      setUser(userState);
      localStorage.setItem('user', JSON.stringify(userState));
    }
  };

  const doRegister = async (username: string, password: string) => {
    const response = await register({ username, password });
    if (response) {
      const payload = decodeToken(response.accessToken);

      if (!payload) throw new Error('Invalid Acesstoken');

      const userState = {
        userId: payload?.userId,
        username: payload?.username,
        accessToken: response.accessToken,
      };

      setUser(userState);
      localStorage.setItem('user', JSON.stringify(userState));
    }
  };

  const doLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, register: doRegister, login: doLogin, logout: doLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
