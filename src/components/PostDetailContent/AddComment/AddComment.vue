<template>
  <dialog class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Answer to {{ commenter?.tag_name }}</h3>
      <form action="POST" @submit="(e:Event) => {
        handleSubmit(e);
      }">
        <textarea class="textarea textarea-bordered w-full my-4" name="reply" id="reply" rows="10"
          placeholder="Type here your wise answer" v-model="content"></textarea>
        <div class="flex gap-3 justify-end">
          <ButtonVue class="btn btn-sm" :handleClick="handleToggle">Close</ButtonVue>
          <ButtonVue class="btn btn-primary text-white btn-sm" type="submit">
            <CommentIcon />
            Trả lời
          </ButtonVue>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type { User, Comment, SubComment } from "@/types/types";
import { ref } from "vue";
import { usePostStore } from "@/stores";
import { } from "pinia";

import Ava from "@/assets/image/users/Ava.jpeg";

const postStore = usePostStore();

let content = ref<string>("");

const props = defineProps<{
  handleToggle: any;
  showModal: boolean;
  parentId: string | null;
  commenter: User | undefined;
  post_id: number;
}>();

const handleAddComment = () => {
  const comment: Comment = {
    post_id: props.post_id,
    comment_id: postStore.triggerCountComment(),
    commenter: {
      user_id: 1,
      ava_img: Ava,
      tag_name: "@Golanginya",
    },
    content: content.value,
    reaction: {
      like: 0,
      dislike: 0,
      total: 0
    },
    sub_comments: [],
    parent_id: null,
    create_time: Date()
  };
  postStore.addComments(comment);
};

const handleAddSubComment = () => {
  const subComment:SubComment = {
    commenter: {
      user_id: 1,
      ava_img: Ava,
      tag_name: "@Golanginya",
    },
    content: content.value,
    parent_id: props.parentId!,
    create_time: Date()
  }

  postStore.addSubComments(subComment, props.parentId!);
}

let handleSubmit = (e:Event) => {
  e.preventDefault()  

  if(!props.parentId){
    handleAddComment();
  } else {
    handleAddSubComment();
  }


  props.handleToggle();
 };
</script>

<style scoped></style>
