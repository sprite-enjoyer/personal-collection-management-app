import { action, makeObservable, observable, toJS } from "mobx";
import { User } from "../misc/types";
import { NavigateFunction } from "react-router-dom";

class AdminPageStore {
  users: User[] = [];

  selectedUsers: User[] = [];
  constructor() {
    makeObservable(this, {
      users: observable,
      selectedUsers: observable,
      setUsers: action,
      setSelectedUsers: action,
      fetchUsers: action,
    });

    this.fetchUsers();
  }

  setUsers(newValue: User[]) {
    this.users = newValue;
  }

  setSelectedUsers(newValue: User[]) {
    this.selectedUsers = newValue;
  }

  async fetchUsers() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const users = (await response.json()).users as User[];
    this.setUsers(users);
  }

  async changeSelectedUsers(blocked: boolean | null, isAdmin: boolean | null) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/put`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ blocked: blocked, isAdmin: isAdmin, userIDs: this.selectedUsers.map((u) => u.id) }),
    });
    this.fetchUsers();
  }

  async deleteSelectedUsers() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/delete`, {
      method: "DELETE",
      body: JSON.stringify({ userIDs: this.selectedUsers.map((u) => u.id) }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    this.fetchUsers();
  }
}

export default AdminPageStore;
