export interface AuthToken {
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}
