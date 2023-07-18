import { action, makeObservable, observable, toJS } from "mobx";
import { ItemCardItem } from "../misc/types";
import axios from "axios";

class SearchModalStore {
  textFieldValue = "";

  searchValues: string[] = [];

  results: ItemCardItem[] = [];

  constructor() {
    makeObservable(this, {
      textFieldValue: observable,
      searchValues: observable,
      results: observable,
      setTextFieldValue: action,
      setSearchValues: action,
      removeSearchValue: action,
      addSearchvalue: action,
      fetchResults: action,
      setResults: action,
    });
  }

  setResults(newValue: ItemCardItem[]) {
    this.results = newValue;
  }

  setTextFieldValue(newValue: string) {
    this.textFieldValue = newValue;
  }

  setSearchValues(newValue: string[]) {
    this.searchValues = newValue;
  }

  removeSearchValue(value: string) {
    this.setSearchValues(this.searchValues.filter((v) => v !== value));
  }

  addSearchvalue(newValue: string) {
    this.searchValues.push(newValue);
  }

  async fetchResults() {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/items/search`, {
      searchValues: this.searchValues.map((s) => s.toLowerCase()),
    });

    const { data } = (await response.data) as { data: ItemCardItem[] };
    this.setResults(data);
  }
}

export default SearchModalStore;
