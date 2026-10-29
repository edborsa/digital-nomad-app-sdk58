import { AuthUser } from "@/src/domain/auth/AuthUser";
import {
  AuthSignUpParams,
  AuthUpdateProfileParams,
  IAuthRepo,
} from "@/src/domain/auth/IAuthRepo";
import { getSessionUserId } from "@/src/domain/auth/useSessionStore";
import { authUsers } from "./data/authUsers";
import { issueFakeJwt } from "./fakeJwt";

export class InMemoryAuthRepo implements IAuthRepo {
  // Profile edits by AuthUser id, layered over the seeded users
  private profileEdits = new Map<string, AuthUpdateProfileParams>();

  async signIn(email: string, password: string): Promise<string> {
    const user = authUsers.find((user) => user.email === email);
    if (user) {
      return issueFakeJwt(user.id);
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

  // Like a backend reading the bearer token, the AuthUser is whoever the Session belongs to
  async getUser(): Promise<AuthUser> {
    const user = this.findSessionUser();
    return { ...user, ...this.profileEdits.get(user.id) };
  }

  async updateProfile(params: AuthUpdateProfileParams): Promise<void> {
    this.profileEdits.set(this.findSessionUser().id, params);
  }

  async updatePassword(): Promise<void> {
    return;
  }

  private findSessionUser(): AuthUser {
    const userId = getSessionUserId();
    const user = authUsers.find((user) => user.id === userId);
    if (!user) {
      throw new Error("not signed in");
    }
    return user;
  }
}
