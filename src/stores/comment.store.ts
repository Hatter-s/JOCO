import { defineStore } from "pinia";
import { comments } from "@/data/data";
import type { DeletedComment, AddedComment, ChangedComment } from "@/types";
import { addComment, deleteComment, getCommentsByPostId } from "@/api";

export const useCommentStore = defineStore("comments", {
  state: () => ({
    comments: <Comment[] | []> comments,
  }),

  getters: {

  },

  actions: {
    async addComments(data:AddedComment) {
      try {
        const record = addComment(data);
      } catch (error) {
        console.log(error);
        
      }
    },

    async changeComments(data:ChangedComment) {
      try {
        const record = addComment(data);
      } catch (error) {
        console.log(error);
        
      }
    },

    async deleteComments(data:DeletedComment) {
      try {
        const record = deleteComment(data);
      } catch (error) {
        console.log(error);
        
      }
    },

    async getCommentsByPostId(postId:number, pageNo:number, pageSize:number) {
      try {
        const record = getCommentsByPostId(postId, pageNo, pageSize);
      } catch (error) {
        console.log(error);
        
      }
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
