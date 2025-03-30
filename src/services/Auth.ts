import { useRouter } from "next/navigation";
import Http, { backendBaseUrl, backendUrl } from "./Http";
import { useState } from "react";

export type User = {
  id: number,
  username: string,
  email: string,
}


export default class Auth
{
  private constructor() {}

  public static Init() {
  }

  public static async User() : Promise<User|null> {
    return await Http.Get(`${backendUrl}/auth/user`);
  }

  public static Login(username: string, password: string): Promise<User|null> {
    return new Promise<User|null>(async resolve => {
      await this.GetCSRFToken();
      Http.Post<User>(`${backendUrl}/auth/login`, {username, password})
      .then(user => {
        resolve(user);
      })
      .catch(_ => {
        //console.error(err)
        resolve(null);
      });
    });
  }

  public static Logout() : Promise<boolean> {
    return new Promise<boolean>(resolve => {
      Http.Post(`${backendUrl}/auth/logout`)
      .then(_ => {
        resolve(true);
      })
      .catch(_ => {
        resolve(false);
      })
    });
  }

  public static Register(username: string, email: string, password: string): Promise<User|null> {
    return new Promise<User|null>(async resolve => {
      await this.GetCSRFToken();
      Http.Post<User>(`${backendUrl}/auth/register`, {username, email, password})
      .then(user => {
        resolve(user);
      })
      .catch(_ => {
        resolve(null);
      });
    });
  }

  private static GetCSRFToken() {
    return Http.Get(`${backendBaseUrl}/sanctum/csrf-cookie`);
  }
}