import axios from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { User } from "../misc/types";

class GlobalUserInfoStore {
  user: User | null = null;

  currentlyViewingUser?: string;

  userChecked = false;

  constructor() {
    makeObservable(this, {
      userChecked: observable,
      user: observable,
      currentlyViewingUser: observable,
      checkJWTAndSetUserStatus: action,
      setCurrentlyViewingUser: action,
      setUserChecked: action,
      setUser: action,
      loggedInUserHasPermissionToEdit: computed,
    });
  }

  setUser(newValue: User | null) {
    this.user = newValue;
  }

  get loggedInUserHasPermissionToEdit() {
    return (this.user && this.user.username === this.currentlyViewingUser) || (this.user && this.user.isAdmin);
  }

  setUserChecked(newValue: boolean) {
    this.userChecked = newValue;
  }

  setCurrentlyViewingUser(newValue: string) {
    this.currentlyViewingUser = newValue;
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
      const user = await GlobalUserInfoStore.fetchUser(userID);
      this.setUser(user);
    }

    this.setUserChecked(true);

    return null;
  }

  async signOut(globalUserInfoStore: GlobalUserInfoStore) {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/signOut`, {
      withCredentials: true,
    });
    const { success } = (await response.data) as { success: boolean };
    if (success) globalUserInfoStore.setUser(null);
  }

  static async fetchUser(userID: string) {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/getUserById/${userID}`);
    const { data } = (await response.data) as { data: User };
    return data;
  }
}

export default GlobalUserInfoStore;
