import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  userId: number;
  username: string;
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error('Falha ao decodificar o token', error);
    return null;
  }
};
