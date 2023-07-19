import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";

class GlobalUserInfoStore {
  loggedIn = false;

  userName?: string;

  isAdmin = false;

  blocked = false;

  currentlyViewingUser?: string;

  userChecked = false;

  constructor() {
    makeObservable(this, {
      loggedIn: observable,
      userChecked: observable,
      userName: observable,
      isAdmin: observable,
      currentlyViewingUser: observable,
      blocked: observable,
      setIsAdmin: action,
      setLoggedIn: action,
      setUserName: action,
      setBlocked: action,
      checkJWTAndSetUserStatus: action,
      setCurrentlyViewingUser: action,
      setUserChecked: action,
      loggedInUserHasPermissionToEdit: computed,
    });
  }

  get loggedInUserHasPermissionToEdit() {
    return this.userName === this.currentlyViewingUser && this.loggedIn;
  }

  setUserChecked(newValue: boolean) {
    this.userChecked = newValue;
  }

  setCurrentlyViewingUser(newValue: string) {
    this.currentlyViewingUser = newValue;
  }

  setLoggedIn(newValue: boolean) {
    this.loggedIn = newValue;
  }

  setUserName(newValue?: string) {
    this.userName = newValue;
  }

  setIsAdmin(newValue: boolean) {
    this.isAdmin = newValue;
  }

  setBlocked(newValue: boolean) {
    this.blocked = newValue;
  }

  async checkJWTAndSetUserStatus() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/checkJWT`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ justCheck: true }),
    });

    const { userID, blocked, isAdmin, userName } = (await response.json()) as {
      userID: string | null;
      blocked: boolean;
      isAdmin: boolean;
      userName?: string;
    };

    if (userID && userName) {
      this.setIsAdmin(isAdmin);
      this.setBlocked(blocked);
      this.setUserName(userName);
      this.setLoggedIn(true);
    }

    this.setUserChecked(true);

    return null;
  }

  async signOut(globalUserInfoStore: GlobalUserInfoStore) {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/signOut`, {
      withCredentials: true,
    });
    const { success } = (await response.data) as { success: boolean };
    if (success) {
      globalUserInfoStore.setLoggedIn(false);
      globalUserInfoStore.setUserName();
    }
  }
}

export default GlobalUserInfoStore;
