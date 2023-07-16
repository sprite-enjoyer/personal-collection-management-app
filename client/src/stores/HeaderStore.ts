import { action, makeObservable, observable } from "mobx";

class HeaderStore {
  searchModalOpen = false;

  constructor() {
    makeObservable(this, {
      searchModalOpen: observable,
      setSearchModalOpen: action,
    });
  }

  setSearchModalOpen(newValue: boolean) {
    this.searchModalOpen = newValue;
  }
}

export default HeaderStore;
