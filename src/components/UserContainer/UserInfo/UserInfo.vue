<template>
    <div class="bg-white rounded-md shadow-md w-[240px]">
        <div class="relative">
            <img :src="IMG_URL + user?.avatarAddress" alt="poster-img"
                class="h-[200px] max-w-[200px] object-cover rounded-full p-5 box-content relative left-1/2 -translate-x-1/2">
            <form action="" class="absolute bottom-8 left-1/4 ">
                <label for="avatar" class="h-8 w-8 bg-primary flex rounded-full justify-center items-center cursor-pointer">
                    <Pen class="w-4 h-4 text-white" />
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg" class="hidden"
                        @change="handleUpdateAvatar" />
                </label>
            </form>
        </div>

        <p class="poster-tag text-center font-bold text-lg pb-5">
            {{ user?.tagName }}
        </p>
        <hr />
        <p class="flex justify-center gap-2 items-center text-xl py-5 text-primary">
            <Award />
            {{ allReaction }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore, useUserStore } from "@/stores";
import { storeToRefs } from "pinia";
import { getFileURL } from "@/api";

const IMG_URL = import.meta.env.VITE_GET_IMAGE_URL;

onMounted(() => {
    if (user.value) {
    //     getFileURL(user.value.avatarAddress).then(res => posterAvatar.value = 'data:image/png;base64, ' + res.data.data);
        userStore.getAllReaction(user.value.id).then(res => allReaction.value = res);
    }
})

const userStore = useUserStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const handleUpdateAvatar = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    let fileList: FileList | null = target.files;
    if (fileList) {
        console.log("FileUpload -> files", fileList[0]);
        const formData = new FormData();
        formData.append("file", fileList[0]);
        authStore.updateAvatar(user.value!.id, formData)
            .then(res => {
                
                if (user.value) {
                    // getFileURL(user.value.avatarAddress).then(res => posterAvatar.value = 'data:image/png;base64, ' + res.data.data);

                    
                }
            });
    }
}

const allReaction = ref(); 

</script>

<style scoped></style>