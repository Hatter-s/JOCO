import { defineStore } from "pinia";
import { type Comment } from "../types/types";
import { comments } from "@/data/data";

const localStorageComments: unknown =
  JSON.parse(localStorage.getItem("comments")!) || [];

const handleTypeComments: Comment[] | [] = localStorageComments as Comment[] | [];

export const useCommentStore = defineStore("comments", {
  state: () => ({
    comments: <Comment[] | []> comments,
  }),

  getters: {
    getTotalComment(state): Comment[] | [] {
      return state.comments;
    },
    countTotalComment(state): Number {
      return state.comments.length;
    },
    getCommentById(state) {
      return (commentId: Number): Comment | undefined => {
        return state.comments.find((comment) => comment.comment_id === commentId);
      };
    },
  },

  actions: {
    saveComments() {
      localStorage.setItem("comments", JSON.stringify(this.comments));
    },

    deleteComments(commentId: Number) {
      this.comments = this.comments.filter((comment) => comment.comment_id === commentId);

      this.saveComments();
    },
    likeComment(commentId: Number) {
      this.comments = this.comments.map((comment) => {
        if (comment.comment_id === commentId) {

          comment.reaction.like = Number(comment.reaction.like) + 1;
          
          comment.reaction.total = Number(comment.reaction.total) + 1;
        }
        return comment;
      });
      
      this.saveComments();
    },

    dislikeComment(commentId: Number) {
      this.comments = this.comments.map((comment) => {
        if (comment.comment_id === commentId) {

          comment.reaction.dislike = Number(comment.reaction.dislike) + 1;
          
          comment.reaction.total = Number(comment.reaction.total) - 1;
        }
        return comment;
      });
      
      this.saveComments();
    },
  },
});
