import { EditorSettings } from "@/app/editor/page";
import Http, { backendBaseUrl, backendUrl } from "./Http";

export type User = {
  id: string,
  username: string,
  email: string,
}

export type UserPreferences = {
  editor?: EditorSettings
}

export type UserInfo = {
  user: User,
  preferences: UserPreferences
}


export default class Auth
{
  private constructor() {}

  public static Init() {
  }

  public static async User() : Promise<User|null> {
    const r = await Http.Get<User>(`${backendUrl}/auth/user`);
    if (r.Success()) {
      return r.Result();
    }
    return null;
  }

  public static async Login(username: string, password: string): Promise<User|null> {
    const csrfRequest = await this.GetCSRFToken();
    if (!csrfRequest.Success()) {
      //TODO Handle csrf request error
      return null;
    }
    const r = await Http.Post<User>(`${backendUrl}/auth/login`, {username, password});
    if (r.Success()) {
      return r.Result();
    }
    return null;
  }

  public static async Logout() : Promise<boolean> {
    const r = await Http.Post(`${backendUrl}/auth/logout`);
    if (r.Success()) {
      return true;
    }
    return false;
  }

  public static async Register(username: string, email: string, password: string): Promise<User|null> {
    const csrfRequest = await this.GetCSRFToken();
    if (!csrfRequest.Success()) {
      //TODO Handle csrf request error
      return null;
    }
    const r = await Http.Post<User>(`${backendUrl}/auth/register`, {username, email, password});
    if (r.Success()) {
      return r.Result();
    }
    return null;
  }

  private static GetCSRFToken() {
    return Http.Get(`${backendBaseUrl}/sanctum/csrf-cookie`);
  }
}