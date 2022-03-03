import { apiClient } from '@/utils/api-client';

const BASE_URL = '/api/auth';

interface SignUpRequest {
  email: string;
  password: string;
}

const signUp = async (request: SignUpRequest) => {
  const res = await apiClient.post(`${BASE_URL}/signup`, { email: request.email, password: request.password });
  const result = res.data;
  return {
    userId: result.user.id,
    email: result.user.email,
  };
};

interface SignInRequest {
  email: string;
  password: string;
}

const signIn = async (request: SignInRequest) => {
  const res = await apiClient.post(`${BASE_URL}/signin`, { email: request.email, password: request.password });
  const result = res.data;
  return {
    userId: result.user.id,
    email: result.user.email,
  };
};

const signOut = async () => {
  await apiClient.post(`${BASE_URL}/signout`);
};

const checkAuth = async () => {
  const res = await apiClient.get(`${BASE_URL}/check`);
  const result = res.data;
  return {
    userId: result.id,
    email: result.email,
  };
};

export const authService = Object.freeze({ signUp, signIn, signOut, checkAuth });
