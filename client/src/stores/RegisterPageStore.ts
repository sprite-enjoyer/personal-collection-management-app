import { action, computed, makeObservable, observable } from "mobx";
import { NavigateFunction } from "react-router-dom";

class RegisterPageStore {
  userName = "";

  email = "";

  password = "";

  repeatPassword = "";

  errorTexts = {
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  constructor() {
    makeObservable(this, {
      userName: observable,
      errorTexts: observable,
      email: observable,
      password: observable,
      repeatPassword: observable,
      setEmail: action,
      setPassword: action,
      setRepeatPassword: action,
      setUserName: action,
      setEmailErrorText: action,
      setPasswordErrorText: action,
      setRepeatPasswordErrorText: action,
      setUserNameErrorText: action,
      requestBody: computed,
      areFieldValuesValid: computed,
    });
  }

  setUserNameErrorText(newValue: string) {
    this.errorTexts.userName = newValue;
  }

  setEmailErrorText(newValue: string) {
    this.errorTexts.email = newValue;
  }

  setPasswordErrorText(newValue: string) {
    this.errorTexts.password = newValue;
  }

  setRepeatPasswordErrorText(newValue: string) {
    this.errorTexts.repeatPassword = newValue;
  }

  setUserName(newValue: string) {
    this.userName = newValue;
    this.setUserNameErrorText("");
  }

  setEmail(newValue: string) {
    this.email = newValue;
    this.setEmailErrorText("");
  }

  setPassword(newValue: string) {
    this.password = newValue;
    this.setPasswordErrorText("");
  }

  setRepeatPassword(newValue: string) {
    this.repeatPassword = newValue;
    this.setRepeatPasswordErrorText("");
  }

  get requestBody() {
    const result = {
      userName: this.userName,
      email: this.email,
      password: this.password,
    };
    return result;
  }

  get areFieldValuesValid() {
    if (
      this.userName.length === 0 ||
      this.email.length === 0 ||
      this.password.length === 0 ||
      this.repeatPassword.length === 0
    )
      return false;
  }

  async handleRegister(navigate: NavigateFunction) {
    const emptyStringErrorText = "Empty field isn't allowed";

    if (this.userName.length === 0) {
      this.setUserNameErrorText(emptyStringErrorText);
      return;
    }
    if (this.email.length === 0) {
      this.setEmailErrorText(emptyStringErrorText);
      return;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      const errorText = "Invalid email!";
      this.setEmailErrorText(errorText);
      return;
    }

    if (this.password.length === 0 && this.repeatPassword.length === 0) {
      this.setPasswordErrorText(emptyStringErrorText);
      this.setRepeatPasswordErrorText(emptyStringErrorText);
      return;
    }

    if (!(this.password === this.repeatPassword)) {
      const errorText = "Passwords do not match!";
      this.setPasswordErrorText(errorText);
      this.setRepeatPasswordErrorText(errorText);
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
