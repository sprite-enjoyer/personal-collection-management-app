import { action, computed, makeObservable, observable } from "mobx";
import { NavigateFunction } from "react-router-dom";

class RegisterPageStore {
  userName = "";

  email = "";

  password = "";

  repeatPassword = "";

  error = false;

  constructor() {
    makeObservable(this, {
      userName: observable,
      email: observable,
      error: observable,
      password: observable,
      repeatPassword: observable,
      setEmail: action,
      setPassword: action,
      setRepeatPassword: action,
      setUserName: action,
      setError: action,
      requestBody: computed,
    });
  }

  setUserName(newValue: string) {
    this.userName = newValue;
  }

  setError(newValue: boolean) {
    this.error = newValue;
  }

  setEmail(newValue: string) {
    this.email = newValue;
  }

  setPassword(newValue: string) {
    this.password = newValue;
    this.setError(false);
  }

  setRepeatPassword(newValue: string) {
    this.repeatPassword = newValue;
    this.setError(false);
  }

  get requestBody() {
    const result = {
      userName: this.userName,
      email: this.email,
      password: this.password,
    };
    return result;
  }

  async handleRegister(navigate: NavigateFunction) {
    if (!(this.password === this.repeatPassword)) {
      this.setError(true);
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.requestBody),
    });
    const data = await response.json();
    const success = data.success as boolean;
    if (success) navigate("/login");
  }
}

export default RegisterPageStore;
