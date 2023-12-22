<template>
    <dialog class="modal" :class="{ 'modal-open': showModal }">
        <div class="modal-box mim-w-[1000px]">
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
                    <QuillEditor theme="snow" toolbar="full" v-model:content="content" contentType="html" />
                </div>



                <div class="flex gap-3 justify-end">
                    <ButtonVue class="btn btn-sm" :handleClick="handleToggle">Close</ButtonVue>
                    <ButtonVue class="btn btn-primary text-white btn-sm" type="submit">
                        Tao post
                    </ButtonVue>
                </div>


            </form>
        </div>
    </dialog>
</template>
  
<script setup lang="ts">
import type { User, PostCreate } from "@/types/types";
import { ref } from "vue";
import { usePostStore } from "@/stores";
import { storeToRefs } from "pinia";

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';


const postStore = usePostStore();

let content = ref();
let title = ref<string>('');

const props = defineProps<{
    handleToggle: any;
    showModal: boolean;
    posterID: string | undefined;
}>();



let handleSubmit = async (e: Event) => {
    try {
        e.preventDefault();
    
        if (props.posterID) {
            return false;
        }
        const reactionID = await postStore.createReaction(title.value);
        const data: PostCreate = {
            "poster": props.posterID!,
            "title": title.value,
            "content": content.value,
            "views": 0,
            "comments": 0,
            "reaction": reactionID,
            "tags": ""
        };

        await postStore.addPost(data)

        props.handleToggle();
    } catch(err) {
        console.error(err);
        
    }


};
</script>
  
<style scoped>
.modal-box {
    min-width: min(80vw, 1000px);
}
</style>
  