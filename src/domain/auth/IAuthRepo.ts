import { AuthUser } from "./AuthUser";

export type AuthSignUpParams = {
  fullname: string;
  email: string;
  password: string;
};

export type AuthUpdateProfileParams = {
  fullname: string;
  email: string;
};
export type AuthUpdatePasswordParams = {
  currentPassword: string;
  newPassword: string;
};

export interface IAuthRepo {
  /** Resolves with the Session token */
  signIn: (email: string, password: string) => Promise<string>;
  signOut: () => Promise<void>;
  signUp: (params: AuthSignUpParams) => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  getUser: () => Promise<AuthUser>;
  updateProfile: (params: AuthUpdateProfileParams) => Promise<void>;
  updatePassword: (params: AuthUpdatePasswordParams) => Promise<void>;
}
