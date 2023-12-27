<template>
  <dialog class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Answer to {{ commenterTagName }}</h3>
      <form action="POST" @submit="(e: Event) => {
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
import type { AddedComment } from "@/types";
import { ref } from "vue";
import { useCommentStore, useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";

const commentStore = useCommentStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

let content = ref<string>("");

const props = defineProps<{
  handleToggle: any;
  showModal: boolean;

  parentId: number | null;
  postId: number;
  commenterTagName: string
}>();

const handleAddComment = () => {
  if (user.value?.id === undefined) {
    return;
  }

  const comment: AddedComment = {
    id: null,
    postId: props.postId,
    userId: user.value?.id,
    content: content.value,
    parentId: props.parentId,
  };

  commentStore.addComments(comment);

  content.value = '';
};

// const handleAddSubComment = () => {
//   const subComment:SubComment = {
//     commenter: {
//       user_id: 1,
//       ava_img: Ava,
//       tag_name: "@Golanginya",
//     },
//     content: content.value,
//     parent_id: props.parentId!,
//     create_time: Date()
//   }

//   postStore.addSubComments(subComment, props.parentId!);
// }

let handleSubmit = (e: Event) => {
  e.preventDefault()

  handleAddComment();


  props.handleToggle();
};
</script>

<style scoped></style>
