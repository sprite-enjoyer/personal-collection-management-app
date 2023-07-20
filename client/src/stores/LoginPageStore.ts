import { action, computed, makeObservable, observable } from "mobx";
import { NavigateFunction } from "react-router-dom";
import GlobalUserInfoStore from "./GlobalUserInfoStore";
import { User } from "../misc/types";

class LoginPageStore {
  userName = "";

  password = "";

  constructor() {
    makeObservable(this, {
      userName: observable,
      password: observable,
      setUserName: action,
      setPassword: action,
      requestBody: computed,
    });
  }

  setUserName(newValue: string) {
    this.userName = newValue;
  }

  setPassword(newValue: string) {
    this.password = newValue;
  }

  get requestBody() {
    const result = {
      userName: this.userName,
      password: this.password,
    };

    return result;
  }

  async handleLogin(navigate: NavigateFunction, globalUserInfoStore: GlobalUserInfoStore) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(this.requestBody),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success, data } = (await response.json()) as { success: boolean; data: User };
    if (success && data) {
      globalUserInfoStore.setUser(data);
      navigate(`/user/${data.username}`);
    }
  }
}

export default LoginPageStore;
