<template>
    <div class="bg-white rounded-md shadow-md w-[240px]">
        <img :src="IMG_URL + poster?.avatarAddress" alt="poster-img" class="h-[200px] max-w-[200px] object-cover rounded-full p-5 box-content relative left-1/2 -translate-x-1/2">
        <p class="poster-tag text-center font-bold text-lg pb-5">
            {{ poster.tagName }}
        </p>
        <hr/>
        <p class="flex justify-center gap-2 items-center text-xl py-5 text-primary">
            <Award/>
            {{ allReaction }}
        </p>
    </div>
</template>

<script setup lang="ts">
import type { User } from "@/types";
import { getFileURL } from "@/api";
import { useUserStore } from "@/stores";

const IMG_URL = import.meta.env.VITE_GET_IMAGE_URL;

onMounted(() => {
    // getFileURL(props.poster.avatarAddress).then(res => posterAvatar.value = 'data:image/png;base64, ' + res.data.data);
    if (props.poster) {
        userStore.getAllReaction(props.poster.id).then(res => allReaction.value = res);
    }
})

const userStore = useUserStore();
const props = defineProps<{
    poster: User
}>();

const allReaction = ref(); 
</script>

<style scoped>

</style>