import { defineStore } from "pinia";
import type { Comment, SubComment } from "../types/types";
import type { EditedPost, Post, DeletedPost, AddedPost, ChangedSelfReaction } from "@/types";
import { data, comments } from "@/data/data";
import { addPost, deletePost, editPost, getListPost, getPostByPostId, getPostsByTagId, getPostsByUserId, increaseLookTime, searchPost } from "@/api";
import { useUserStore, useAlertStore } from ".";


export const usePostStore = defineStore("posts", {
  state: () => ({
    posts: <Post[] | []>[],
    currentPost: <Post | null>null,
    sortMethod: <'byNew' | 'byLike' | 'byComment'>'byNew'
  }),

  getters: {
    
  },

  actions: {

    async getPostById(postId: number) {
      const alertStore = useAlertStore();
      try {
        const record = await getPostByPostId(postId);
        const status = record.data.status;

        if (status === 200) {
          const post = record?.data.data[0];
          this.currentPost = {
            postId: post.postId,
            poster: post.userDTO,
            createTime: post.createTime,
            title: post.title,
            content: post.content,
            reaction: {
              like: post.reactionDTO.like,
              dislike: post.reactionDTO.dislike,
              total: post.reactionDTO.like - post.reactionDTO.dislike
            },
            tags: post.tagName,
            watchTime: post.watchTime,
            countComment: post.countComment,
            reactionId: post.reactionId
          }

          await this.increaseLookTime(postId);

        } else if (status === 400) {
          alertStore.error(record?.data.message);

        }
      } catch (error) {

      }
    },

    async getListPost(pageNo: number, pageSize: number) {
      const alertStore = useAlertStore();
      try {
        const record = await getListPost(pageNo, pageSize);
        const status = record?.data.status;

        if (status === 200) {
          const posts = record?.data.data;
          //@ts-ignore
          this.posts = posts.map(post => ({
            postId: post.postId,
            poster: post.userDTO,
            createTime: post.createTime,
            title: post.title,
            content: post.content,
            reaction: {
              like: post.reactionDTO.like,
              dislike: post.reactionDTO.dislike,
              total: post.reactionDTO.like - post.reactionDTO.dislike
            },
            tags: post.tagName,
            watchTime: post.watchTime,
            countComment: post.countComment
          }))

          this.sortPost(this.sortMethod)

        } else if (status === 400) {
          alertStore.error(record?.data.message);

        }
      } catch (error) {

      }

    },

    sortPost(method: 'byNew' | 'byLike' | 'byComment') {
      const newPosts = this.posts.sort((a, b) => {
        if (method === 'byNew') {
          let d1 = new Date(a.createTime).getTime();
          let d2 = new Date(b.createTime).getTime();
          
          return d2 -d1 ? -1 : 1;
        }
        else if(method === 'byLike') {
          return b.reaction.total - a.reaction.total;
        } else {
          return b.countComment - a.countComment;
        }
      })

      this.posts = newPosts;
    },

    async getPostsByUserId(userId: number, pageNo: number, pageSize: number) {

      const alertStore = useAlertStore();
      try {
        const record = await getPostsByUserId(userId, pageNo, pageSize);
        const status = record.data.status;

        if (status === 200) {
          const posts = record?.data.data;
          //@ts-ignore
          this.posts = posts.map(post => ({
            postId: post.postId,
            poster: post.userDTO,
            createTime: post.createTime,
            title: post.title,
            content: post.content,
            reaction: {
              like: post.reactionDTO.like,
              dislike: post.reactionDTO.dislike,
              total: post.reactionDTO.like - post.reactionDTO.dislike
            },
            tags: post.tagName,
            watchTime: post.watchTime,
            countComment: post.countComment,
            reactionId: post.reactionId
          }))

          this.sortPost(this.sortMethod)

        } else if (status === 400) {
          alertStore.error(record?.data.message);

        }

      } catch (error) {

      }

    },

    async getPostByTagId(tagId: number, pageNo: number, pageSizeNumber: number) {
      const record = await getPostsByTagId(tagId, pageNo, pageSizeNumber);
    },

    async addPost(data: AddedPost) {
      const alertStore = useAlertStore();
      try {
        const record = await addPost(data);
        const status = record?.data.status;
        if (status === 200) {
          alertStore.success(record?.data.message);

          await this.getListPost(0, 50);
        } else if (status === 400) {
          alertStore.error(record?.data.message);

        }

      } catch (err) {
        console.error(err);

      }
    },

    async editPost(data: EditedPost) {
      const alertStore = useAlertStore();
      try {
        const record = await editPost(data);
        const status = record.data.status;

        if (status === 200) {
          const post = record?.data.data[0];
          // this.currentPost = {
          //   postId: post.postId,
          //   poster: post.userDTO,
          //   createTime: post.createTime,
          //   title: post.title,
          //   content: post.content,
          //   reaction: {
          //     like: post.reactionDTO.like,
          //     dislike: post.reactionDTO.dislike,
          //     total: post.reactionDTO.like - post.reactionDTO.dislike
          //   },
          //   tags: post.tagName,
          //   watchTime: post.watchTime,
          //   countComment: post.countComment
          // }
          this.getPostById(post.id)

        } else if (status === 400) {
          alertStore.error(record?.data.message);

        }

      } catch (error) {

      }
    },

    async deletePosts(data: DeletedPost) {
      try {
        const record = await deletePost(data);
        const status = record.data.data;
        if (status === 200) {
          useRouter().push({ name: 'home' })
        }
      } catch (error) {
        console.error(error);

      }
    },

    async likePost(data: ChangedSelfReaction) {
      const userStore = useUserStore();
      const alertStore = useAlertStore();
      try {
        const isLike = userStore.getReaction(true, data.entityId);
        const record = await userStore.changeReaction(data);
        const status = record.data.status;
        if (status === 200) {
          // handle display number
          if (isLike === null) {
            this.currentPost!.reaction.like += 1;
          }
          else if (isLike === false) {
            this.currentPost!.reaction.dislike -= 1;
            this.currentPost!.reaction.like += 1;
          } else if (isLike === true) {
            this.currentPost!.reaction.like -= 1;
          }

          //handle display color
          const getReactionRecord = await userStore.getReactions(data.userId);
        }
      } catch (error) {
        console.error(error);

      }

    },

    async dislikePost(data: ChangedSelfReaction) {
      const userStore = useUserStore();
      const alertStore = useAlertStore();
      try {
        const isLike = userStore.getReaction(true, data.entityId);
        const record = await userStore.changeReaction(data);
        const status = record.data.status;
        if (status === 200) {
          // handle display number

          //idk why false === null
          if (isLike === false) {
            console.log('run!');
            
            this.currentPost!.reaction.dislike -= 1;
          }
          else if (isLike === null) {
            this.currentPost!.reaction.dislike += 1;
          } else if (isLike === true) {
            this.currentPost!.reaction.like -= 1;
            this.currentPost!.reaction.dislike += 1;
          }

          //handle display color
          const getReactionRecord = await userStore.getReactions(data.userId);
        }
      } catch (error) {
        console.error(error);

      }

    },

    async searchPost(keyword: string, pageNo: number, pageSize: number) {
      const alertStore = useAlertStore();
      try {
        const record = await searchPost(keyword, pageNo, pageSize);

        const status = record?.data.status;
        if (status === 200) {
          const posts = record?.data.data;
          console.log(posts);
          //@ts-ignore
          this.posts = posts.map(post => ({
            postId: post.postId,
            poster: post.userDTO,
            createTime: post.createTime,
            title: post.title,
            content: post.content,
            reaction: {
              like: post.reactionDTO.like,
              dislike: post.reactionDTO.dislike,
              total: post.reactionDTO.like - post.reactionDTO.dislike
            },
            tags: post.tagName,
            watchTime: post.watchTime,
            countComment: post.countComment
          }))

          this.sortPost(this.sortMethod);

        } else if (status === 400) {
          alertStore.error(record?.data.message);

        }

      } catch (err) {
        console.error(err);

      }

    },

    async increaseLookTime(postId: number) {
      const alertStore = useAlertStore();
      try {
        const record = await increaseLookTime(postId);
        const status = record.data.status;

        if (status === 200) {
          const post = record?.data.data[0];
          this.currentPost!.watchTime += 1;

        } else if (status === 400) {
          alertStore.error(record?.data.message);

        }

      } catch (error) {

      }
    }
  },
});
