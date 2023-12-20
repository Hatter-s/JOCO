import { defineStore } from "pinia";
import type { Post, Comment, SubComment } from "../types/types";
import { data, comments  } from "@/data/data";
import Ava from "@/assets/image/users/Ava.jpeg";

const localStoragePosts: unknown =
  JSON.parse(localStorage.getItem("posts")!);

const handleTypePosts: Post[] | [] = localStoragePosts as Post[] | [];

const localStorageComments: unknown =
  JSON.parse(localStorage.getItem("comments")!);

const handleTypeComments: Comment[] | [] = localStorageComments as Comment[] | [];

const localStorageCountComment: number =
  Number(JSON.parse(localStorage.getItem("countComment")!)) || 3;

export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: <Post[]> handleTypePosts || data,
    comments: <Comment[]>  handleTypeComments || comments,
    countComment: <number> localStorageCountComment,
    // currentUser: <User/> currentUser,
  }),

  getters: {
    getTotalPost(state): Post[] | [] {
      return state.posts;
    },
    countTotalPost(state): Number {
      return state.posts.length;
    },
    getPostById(state) {
      return (postId: Number): Post | undefined => {
        return state.posts.find((post) => post.post_id === postId);
      };
    },



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
    savePosts() {
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },

    deletePosts(postId: Number) {
      this.posts = this.posts.filter((post) => post.post_id === postId);

      this.savePosts();
    },
    likePost(postId: Number) {
      this.posts = this.posts.map((post) => {
        if (post.post_id === postId) {

          post.reaction.like = Number(post.reaction.like) + 1;
          post.reaction.dislike = Number(post.reaction.dislike) -1;
          post.reaction.total = Number(post.reaction.like) - Number(post.reaction.dislike);
        }
        return post;
      });
      
      this.savePosts();
    },

    dislikePost(postId: Number) {
      this.posts = this.posts.map((post) => {
        if (post.post_id === postId) {

          post.reaction.dislike = Number(post.reaction.dislike) + 1;
          post.reaction.like = Number(post.reaction.like) - 1;
          post.reaction.total = Number(post.reaction.like) - Number(post.reaction.dislike);
        }
        return post;
      });
      
      this.savePosts();
    },



    saveComments() {
      localStorage.setItem("comments", JSON.stringify(this.comments));
    },

    addComments(comment: Comment) {
      this.comments = [...this.comments, comment];

      this.saveComments();
    },
    addSubComments(subComment: SubComment, parentId: number) {
      const commentId = this.comments.findIndex(comment => {
        
        return comment.comment_id == parentId;
      });
      
      console.log(commentId);

      this.comments[commentId].sub_comments = [ ...this.comments[commentId].sub_comments, subComment];

      this.saveComments();
    },

    deleteComments(commentId: Number) {
      this.comments = this.comments.filter((comment) => comment.comment_id === commentId);

      this.saveComments();
    },

    likeComment(commentId: Number) {
      this.comments = this.comments.map((comment) => {
        if (comment.comment_id === commentId) {

          comment.reaction.like = Number(comment.reaction.like) + 1;
          comment.reaction.dislike = Number(comment.reaction.dislike) - 1;
          comment.reaction.total = Number(comment.reaction.like) - Number(comment.reaction.dislike);
        }
        return comment;
      });
      
      this.saveComments();
    },

    dislikeComment(commentId: Number) {
      this.comments = this.comments.map((comment) => {
        if (comment.comment_id === commentId) {
          comment.reaction.like = Number(comment.reaction.like) - 1;
          comment.reaction.dislike = Number(comment.reaction.dislike) + 1;
          
          comment.reaction.total = Number(comment.reaction.like) - Number(comment.reaction.dislike);
        }
        return comment;
      });
      
      this.saveComments();
    },
    triggerCountComment() {
      const currentCountComment = this.countComment;
      this.countComment += 1;

      localStorage.setItem('countComment', JSON.stringify(this.countComment));
      return currentCountComment;
    }
  },
});
