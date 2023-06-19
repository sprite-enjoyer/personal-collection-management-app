import { action, computed, makeObservable, observable } from "mobx";

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

  handleRegister() {
    if (!(this.password === this.repeatPassword)) {
      this.setError(true);
    }
    const body = this.requestBody;
    console.log(body);
  }
}

export default RegisterPageStore;
