<template>
    <dialog class="modal" :class="{ 'modal-open': showModal }">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Answer to {{ commenterTagName }}</h3>
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
  import type { AddedComment, ChangedComment } from "@/types";
  import { ref } from "vue";
  import { useCommentStore, useAuthStore } from "@/stores";
  import { storeToRefs } from "pinia";
  
  const commentStore = useCommentStore();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  
  onMounted(() => {
    content.value = props.content;
  })
  
  const props = defineProps<{
    handleToggle: any;
    showModal: boolean;

    id: number;
    content: string;
    parentId: number | null;
    postId: number;
    commenterTagName: string
  }>();
  
  let content = ref<string>('');


  const handleChangeComment = () => {
    if(user.value?.id === undefined) {
      return;
    }
  
    const comment: ChangedComment = {
      id: props.id,
      postId: props.postId,
      userId: user.value?.id,
      content: content.value,
      parentId: props.parentId,
    };
  
    commentStore.changeComments(comment);
  };
  
  
  let handleSubmit = (e:Event) => {
    e.preventDefault()  
  
    if(!props.parentId){
      handleChangeComment();
    }
  
    props.handleToggle();
   };
  </script>
  
  <style scoped></style>
  