import { defineStore } from "pinia";
import type { Comment, SubComment, PostCreate } from "../types/types";
import type { EditedPost, Post, DeletedPost, AddedPost  } from "@/types/post.type";
import { data, comments } from "@/data/data";
import { addPost, deletePost, editPost, getListPost, getPostsByTagId, getPostsByUserId } from "@/api";
import { useUsersStore, useAlertStore } from ".";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

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
    posts: <Post[] | []>[],
    currentPost: <Post | null>null,
    comments: <Comment[]>handleTypeComments || comments,
    countComment: <number>localStorageCountComment,
    // currentUser: <User/> currentUser,
  }),

  getters: {

    countTotalPost(state): Number {
      return state.posts.length;
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

    async getPostById(postID: string) {
      const userStore = useUsersStore();

      const record = await pb.collection('posts').getOne(postID, {
        expand: 'relField1,relField2.subRelField',
      });
      const user = await userStore.getById(record.poster);

      const reaction = await this.getReaction(record.reaction);


      this.currentPost = {
        post_id: record.id,
        poster: user,
        create_time: record.created,
        title: record.title,
        content: record.content,
        views: record.views,
        comments: record.comments,
        reaction: reaction,
        tags: record.tags
      }

    },

    async getReaction(reactionID: string) {
      return await pb.collection('reaction').getOne(reactionID, {
        expand: 'relField1,relField2.subRelField',
      }).then(res => ({ dis_like: res.dis_like, like: res.like, total: res.like - res.dis_like }));
    },

    async getListPost(pageNo:number, pageSize:number) {
      const record = await getListPost(pageNo, pageSize);
    },

    async getAllPost() {
      const userStore = useUsersStore();

      let posts;
      const records = await pb.collection('posts').getFullList({
        sort: '-created',
      })
        .then(res => {
          posts = res
        })
        .catch(err => console.error(err));

      for (let post of posts!) {
        const user = await userStore.getById(post.poster);

        const reaction = await this.getReaction(post.reaction);

        // @ts-ignore
        this.$state.posts = [...this.$state.posts, {
          post_id: post.id,
          poster: user,
          create_time: post.created,
          title: post.title,
          content: post.content,
          views: post.views,
          comments: post.comments,
          reaction: reaction,
          tags: post.tags
        }]
      }
    },

    async getPostByUserId(userId:number, pageNo:number, pageSize:number) {
      const record = await getPostsByUserId(userId, pageNo, pageSize);

    },

    async getPostByTagId(tagId:number, pageNo:number, pageSizeNumber:number) {
      const record = await getPostsByTagId(tagId, pageNo, pageSizeNumber);
    },

    async addPost(data: AddedPost) {
      const alertStore = useAlertStore(); 
      try {
        const record = await addPost(data);
        const status = record?.data.status;
        if (status === 200) {
          alertStore.success(record?.data.response);
          
          await this.getAllPost();
      } else if (status === 400) {
          alertStore.error(record?.data.message);

      }

      } catch (err) {
        console.error(err);

      }
    },

    async editPost(data: EditedPost) {
      const record = await editPost(data);
    },

    async createReaction(name: string) {
      const data = {
        "dis_like": 0,
        "like": 0,
        "name": name
      };

      const record = await pb.collection('reaction').create(data);

      return record.id
    },
    async deletePosts(data: DeletedPost) {
      const record = await deletePost(data);

    },



    likePost(postId: Number) {


      this.savePosts();
    },
    dislikePost(postId: Number) {
      this.posts = this.posts.map((post) => {

        return post;
      });

      this.savePosts();
    },

    async searchPost(searchText: string) {
      const userStore = useUsersStore();

      const resultList = await pb.collection('posts').getList(1, 50, {
        filter: `title ~'${searchText}'`,
      });
      const filterPosts = resultList.items
      this.posts = [];

      for (let post of filterPosts) {
        const user = await userStore.getById(post.poster);

        const reaction = await this.getReaction(post.reaction);

        // @ts-ignore
        this.$state.posts = [...this.$state.posts, {
          post_id: post.id,
          poster: user,
          create_time: post.created,
          title: post.title,
          content: post.content,
          views: post.views,
          comments: post.comments,
          reaction: reaction,
          tags: post.tags
        }]
      }
      // this.posts = filterPosts {}
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

      this.comments[commentId].sub_comments = [...this.comments[commentId].sub_comments, subComment];

      this.saveComments();
    },

    async deleteComments(commentId: Number) {

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
