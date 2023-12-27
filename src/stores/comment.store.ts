import { defineStore } from "pinia";
import type { DeletedComment, AddedComment, ChangedComment, Comment, ChangedSelfReaction } from "@/types";
import { addComment, changeComment, deleteComment, getCommentsByPostId } from "@/api";
import { useAlertStore, useUserStore, usePostStore } from ".";
import router from "@/router";
import { sortComment } from "@/utils/sort-comment";

export const useCommentStore = defineStore("comments", {
  state: () => ({
    comments: <Comment[] | []>[],
  }),

  getters: {

  },

  actions: {
    async addComments(data: AddedComment) {
      const alertStore = useAlertStore();
      try {
        const record = await addComment(data);
        const status = record.data.status;
        if (status === 200) {
          const data = record.data.data;
          this.getCommentsByPostId(data.postId, 0, 50);
        } else if (status === 400) {
          alertStore.error(record?.data.message);
        }

      } catch (error) {
        console.log(error);

      }
    },

    async changeComments(data: ChangedComment) {
      const alertStore = useAlertStore();
      try {
        const record = await changeComment(data);
        const status = record.data.status;

        if (status === 200) {
          const currIndex = this.comments.findIndex(comment => comment.id === data.id);

          console.log(this.comments[currIndex].content);

          this.comments = this.comments.slice(0, currIndex).concat({ ...this.comments[currIndex], content: data.content }).concat(this.comments.slice(currIndex + 1));

          console.log(this.comments[currIndex].content);
        }

      } catch (error) {
        console.log(error);

      }
    },

    async deleteComment(data: DeletedComment) {
      const alertStore = useAlertStore();
      try {
        const record = await deleteComment(data);
        const status = record.data.status;

        if (status === 200) {
          const currIndex = this.comments.findIndex(comment => comment.id === data.id);

          this.comments = [...this.comments.slice(0, currIndex), ...this.comments.slice(currIndex + 1)];
        }
      } catch (error) {
        console.log(error);

      }
    },

    //pageNo START at 0!!!
    async getCommentsByPostId(postId: number, pageNo: number, pageSize: number) {
      const alertStore = useAlertStore();

      try {
        const record = await getCommentsByPostId(postId, pageNo, pageSize);
        const status = record.data.status;
        if (status === 200) {
          const comments = record.data.data;

          this.comments = [...comments];

        } else if (status === 400) {
          alertStore.error(record?.data.message);
        }

      } catch (error) {
        console.log(error);

      }
    },

    async likeComment(data: ChangedSelfReaction) {
      const userStore = useUserStore();
      const alertStore = useAlertStore();
      const postStore = usePostStore();
      try {
        const isLike = userStore.getReaction(false, data.entityId);
        const record = await userStore.changeReaction(data);
        const status = record.data.status;
        if (status === 200) {
          this.getCommentsByPostId(postStore.$state.currentPost!.postId, 0 ,50);

          //handle display color
          // const getReactionRecord = await userStore.getReactions(data.userId);
        }
      } catch (error) {
        console.error(error);

      }

    },

    async dislikeComment(data: ChangedSelfReaction) {
      const userStore = useUserStore();
      const alertStore = useAlertStore();
      const postStore = usePostStore();

      try {
        const isLike = userStore.getReaction(false, data.entityId);
        const record = await userStore.changeReaction(data);
        const status = record.data.status;
        if (status === 200) {
          this.getCommentsByPostId(postStore.$state.currentPost!.postId, 0 ,50);

          //handle display color
          // const getReactionRecord = await userStore.getReactions(data.userId);
        }
      } catch (error) {
        console.error(error);

      }

    },
  },
});
