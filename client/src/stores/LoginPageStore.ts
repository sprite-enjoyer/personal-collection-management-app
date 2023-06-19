import { action, computed, makeObservable, observable } from "mobx";
import { NavigateFunction } from "react-router-dom";

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

  async handleLogin(navigate: NavigateFunction) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(this.requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { success, userName } = await response.json();
    if (success) navigate(`/user/${userName}`);
  }
}

export default LoginPageStore;
