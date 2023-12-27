<template>
    <dialog class="modal" :class="{ 'modal-open': showModal }">
        <div class="modal-box mim-w-[1000px]">
            <form action="PUT" @submit="(e: Event) => {
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
import { getFileURL, uploadFile } from "@/api";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import type { AddedPost, EditedPost, User } from "@/types";
import { post } from "node_modules/axios/index.cjs";

const contentModules = {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
          upload: (file:File) => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("file", file);
                
            
              uploadFile(formData)
              .then(res => {
                const absPath = res.data.data;
                imgAbsPath.value = [...imgAbsPath.value, absPath]
                getFileURL(absPath).then(
                    res => {
                        const base64 = 'data:image/png;base64, ' + res.data.data;
                        imgBase64.value = [...imgBase64.value, base64]
                        resolve(base64);
                    }
                )
                
              })
              .catch(err => {
                reject("Upload failed");
                console.error("Error:", err)
              })
            })
          }
        }
}

onMounted(() => {
    setTimeout(() => {
        content.value = props.content;
    }, 1000);
})

const postStore = usePostStore();
const alertStore = useAlertStore();


const props = defineProps<{
    handleToggle: any;
    showModal: boolean;
    user: User | null;
    postId: number,
    content: string;
    title: string;
    tagName: any;
}>();

let content = ref();
let title = ref<string>(props.title);

let tags = computed(() => {
    if(props.tagName) {
        Object.values(props.tagName)[0]
    }
    return ''
});

let imgAbsPath = ref<string[]>([]);
let imgBase64 = ref<string[]>([]);

const base64ToAbsPath = (string:string, arrImgBase64:string[], arrImgAbsPath: string[]) => {
    const length:number = arrImgBase64.length;
    
    for(let i = 0; i < length; i++) {
        const sliceIndex = string.search(/data:image/);
        const imgBase64Length = arrImgBase64[i].length;
        
        string = string.slice(0, sliceIndex) + arrImgAbsPath[i] + string.slice(imgBase64Length + 26);
        
    }

    return string;
}


let handleSubmit = async (e: Event) => {
    try {
        e.preventDefault();

        if(props.user === null) {
            return false;
        }

        content.value = base64ToAbsPath(content.value, imgBase64.value, imgAbsPath.value);
        console.log(content.value);
        
        
        
        const data: EditedPost = {
            userId : props.user.id,
            postId: props.postId,
            newTitle: title.value,
            newContent: content.value,
        };

        await postStore.editPost(data);

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
  