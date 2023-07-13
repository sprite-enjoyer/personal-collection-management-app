import { action, makeObservable, observable } from "mobx";
import { Comment } from "../misc/types";
import GlobalUserInfoStore from "./GlobalUserInfoStore";

class CommentStore {
  comments: Comment[] = [];

  itemID: string;

  commentFieldValue = "";

  globalUserInfoStore: GlobalUserInfoStore;

  constructor(itemID: string, globalUserInfoStore: GlobalUserInfoStore) {
    this.itemID = itemID;
    this.globalUserInfoStore = globalUserInfoStore;

    makeObservable(this, {
      comments: observable,
      commentFieldValue: observable,
      setComments: action,
      setCommentFieldValue: action,
      fetchComments: action,
      postComment: action,
      addComment: action,
    });
  }

  setCommentFieldValue(newValue: string) {
    this.commentFieldValue = newValue;
  }

  setComments(newValue: Comment[]) {
    this.comments = newValue;
  }

  addComment(comment: Comment) {
    this.setComments([...this.comments, comment]);
  }

  async fetchComments() {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/comments/itemComments/${this.itemID}`);
    const { success, data } = (await response.json()) as { data: Comment[]; success: boolean };
    if (success) this.setComments(data);
  }

  async postComment() {
    if (!this.globalUserInfoStore.loggedIn || !this.globalUserInfoStore.userName || this.commentFieldValue.length === 0)
      return;
    const comment: Omit<Comment, "_id"> = {
      item: this.itemID,
      author: this.globalUserInfoStore.userName,
      text: this.commentFieldValue,
    };

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/comments/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(comment),
    });

    const { data, success } = (await response.json()) as { data: Comment; success: boolean };
  }
}

export default CommentStore;
