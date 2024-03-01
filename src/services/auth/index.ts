import { api } from '../../services/api';

export interface LoginResponse {
  accessToken: string;
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ResponseResponse {
  accessToken: string;
  username: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const register = async (
  credentials: RegisterCredentials,
): Promise<ResponseResponse> => {
  const response = await api.post<ResponseResponse>(
    '/auth/register',
    credentials,
  );
  return response.data;
};
