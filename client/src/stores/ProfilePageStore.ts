import { action, makeObservable, observable } from "mobx";
import { topics } from "../misc/constants";

class ProfilePageStore {
  modalOpen = false;

  constructor() {
    makeObservable(this, {
      modalOpen: observable,
      setModalOpen: action,
    });
  }

  setModalOpen(newValue: boolean) {
    this.modalOpen = newValue;
  }
}

export default ProfilePageStore;
