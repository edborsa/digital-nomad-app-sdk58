import { AuthUser } from "@/src/domain/auth/AuthUser";
import {
  AuthSignUpParams,
  AuthUpdateProfileParams,
  IAuthRepo,
} from "@/src/domain/auth/IAuthRepo";
import { authUsers } from "./data/authUsers";

export class InMemoryAuthRepo implements IAuthRepo {
  // The AuthUser of the current Session; defaults to the first user, like an already signed-in device
  private currentUser: AuthUser = authUsers[0];

  async signIn(email: string, password: string): Promise<AuthUser> {
    const user = authUsers.find((user) => user.email === email);
    if (user) {
      this.currentUser = { ...user };
      return this.currentUser;
    }

    throw new Error("user not found");
  }

  async signUp(params: AuthSignUpParams): Promise<void> {
    const userAlreadyExist = authUsers.find(
      (user) => user.email === params.email,
    );
    if (userAlreadyExist) {
      throw new Error("user already exist");
    }

    return;
  }

  async signOut(): Promise<void> {
    //
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    console.log("the reset password has been sent:", email);
  }

  async getUser(): Promise<AuthUser> {
    return this.currentUser;
  }

  async updateProfile(params: AuthUpdateProfileParams): Promise<void> {
    this.currentUser = { ...this.currentUser, ...params };
  }

  async updatePassword(): Promise<void> {
    return;
  }
}
