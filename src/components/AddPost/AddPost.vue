<template>
    <dialog class="modal" :class="{ 'modal-open': showModal }">
        <div class="modal-box">
            <form action="POST" @submit="(e: Event) => {
                handleSubmit(e);
            }">
                <div class="form-control mb-4">
                    <label for="title">
                        Title
                    </label>
                    <input type="text" name="title" id="title" class="input input-secondary w-full" v-model="title">
                </div>
                <div class="form-control mb-4">
                    <label for="content">
                    Content
                </label>
                <textarea class="textarea textarea-bordered w-full mb-4" name="reply" id="reply" rows="10"
                    placeholder="Type here your wise answer" v-model="content"></textarea>
                </div>

                <QuillEditor theme="snow" />

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
import type { User } from "@/types/types";
import { ref } from "vue";
import { usePostStore } from "@/stores";
import { storeToRefs } from "pinia";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

const postStore = usePostStore();

let content = ref<string>("");
let title = ref<string>('');

const props = defineProps<{
    handleToggle: any;
    showModal: boolean;
    parentId: number | null;
    commenter: User;
    post_id: number;
}>();


let handleSubmit = (e: Event) => {
    e.preventDefault();

    postStore.$state.posts = [ ...postStore.$state.posts, {
        post_id: 99,
        poster: props.commenter,
        create_time: Date(),
        title: title.value,
        content: content.value,
        reaction: {
            like: 0,
            dislike: 0,
            total: 0,
        },
        tags: [],
        views: 0,
        comments: 0
    }]  

    props.handleToggle();
};
</script>
  
<style scoped></style>
  