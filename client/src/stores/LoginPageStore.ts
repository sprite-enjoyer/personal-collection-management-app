import { action, computed, makeObservable, observable } from "mobx";
import { NavigateFunction } from "react-router-dom";
import GlobalUserInfoStore from "./GlobalUserInfoStore";

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

    const { success, userName, blocked, isAdmin } = await response.json();
    if (success) {
      globalUserInfoStore.setLoggedIn(true);
      globalUserInfoStore.setUserName(userName);
      globalUserInfoStore.setBlocked(blocked);
      globalUserInfoStore.setIsAdmin(isAdmin);
      navigate(`/user/${userName}`);
    }
  }
}

export default LoginPageStore;
