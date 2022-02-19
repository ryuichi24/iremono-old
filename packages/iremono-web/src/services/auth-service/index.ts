import { apiClient } from '@/utils/api-client';

interface SignUpRequest {
  email: string;
  password: string;
}

const signUp = async (request: SignUpRequest) => {
  const res = await apiClient.post('/api/auth/signup', { email: request.email, password: request.password });
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
  const res = await apiClient.post('/api/auth/signin', { email: request.email, password: request.password });
  const result = res.data;
  return {
    userId: result.user.id,
    email: result.user.email,
  };
};

const checkAuth = async () => {
  const res = await apiClient.get('/api/auth/check');
  const result = res.data;
  return {
    userId: result.id,
    email: result.email,
  };
};

export const authService = Object.freeze({ signUp, signIn, checkAuth });
