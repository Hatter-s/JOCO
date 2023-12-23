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
                    <QuillEditor 
                    theme="snow" 
                    toolbar="full" v-model:content="content" contentType="html" 
                    :modules="contentModules"
                    />
                </div>

                <div class="form-control mb-4">
                    <label for="tags">
                        Tags
                    </label>
                    <input type="text" id="tags" name="tags" v-model="tags" class="input input-secondary w-full">
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
import ImageUploader from "quill-image-uploader";
import 'quill-image-uploader/dist/quill.imageUploader.min.css';

import { ref } from "vue";
import { usePostStore, useAlertStore } from "@/stores";
import { storeToRefs } from "pinia";
import { uploadFile } from "@/api";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import type { AddedPost, User } from "@/types";
import axios from "axios";


const contentModules = {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
          upload: (file:File) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("file", file);
                
            
              axios.post('http://127.0.0.1:6615/health_care_application/api/v1/upload', formData)
              .then(res => {
                console.log(res)
                resolve(res => `file:///C:\${res.data.data}`);
              })
              .catch(err => {
                reject("Upload failed");
                console.error("Error:", err)
              })
            })
          }
        }
}


const postStore = usePostStore();
const alertStore = useAlertStore();

let content = ref();
let title = ref<string>('');
let tags = ref<string>('');

const props = defineProps<{
    handleToggle: any;
    showModal: boolean;
    user: User | null;
}>();



let handleSubmit = async (e: Event) => {
    try {
        e.preventDefault();

        if(props.user === null) {
            return false;
        }
        // const reactionID = await postStore.createReaction(title.value);
        const data: AddedPost = {
            userId : props.user.id,
            userName: props.user.username,
            title: title.value,
            content: content.value,
            tags: tags.value
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
  