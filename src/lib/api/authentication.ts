import { publicAPI } from '@/lib/api';

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: false;
  createdAt: string;
  updatedAt: string;
};

export type RegisterResponse = {
  user: User;
};

export const registerAPI = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const response = await publicAPI.post<RegisterResponse>('/auth/local/register', payload);

  return response.data as RegisterResponse;
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type LoginResponse = {
  jwt: string;
  user: User;
};

export const loginAPI = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await publicAPI.post<LoginResponse>('/auth/local', payload);

  return response.data as LoginResponse;
};
