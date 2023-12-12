<script setup lang="ts">
import Ava from "@/assets/image/users/Ava.jpeg";
import { ref } from 'vue'

const props = defineProps<{
    position: "in list" | "detail"
}>();

const showModal = ref<Boolean>(false);
const toggleModal = () :void => {    
    showModal.value = !showModal.value;
}
</script>

<template>
    <AddComment :handleToggle="toggleModal" :showModal="showModal" tagName="@Golanginya" />
    <router-link :to="{ name: 'post'}">
        <div class="post">
            <More class="absolute right-7 top-8 text-secondary" />
            <div class="post-head">
                <div class="poster">
                    <img :src="Ava" alt="poster-image" class="h-[40px] w-[40px] rounded-full  aspect-square object-cover">
                    <p class="poster-name">Golanginya</p>
                    <p class="post-time">5 phút trước</p>
                </div>
            </div>
            <div class="post-body">
                <p class="title">How to patch KDE on FreeBSD?</p>
                <p class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla
                </p>
            </div>
            <div class="post-foot">
                <div class="tag flex justify-between items-center gap-2">
                    <ButtonVue class="btn-xs text-[10px] text-secondary rounded-md">
                        golang
                    </ButtonVue>
                    <ButtonVue class="btn-xs text-[10px] text-secondary rounded-md">
                        linux
                    </ButtonVue>
                    <ButtonVue class="btn-xs text-[10px] text-secondary rounded-md">
                        overflow
                    </ButtonVue>
                </div>
                <div v-if="position === 'in list'" class="reaction flex justify-between items-center gap-4">
                    <ButtonVue class=" btn-disabled">
                        <Eye />
                        125
                    </ButtonVue>
                    <ButtonVue class=" btn-disabled">
                        <CommentIcon />
                        15
                    </ButtonVue>
                    <ButtonVue>
                        <Like />
                        155
                    </ButtonVue>
                </div>
                <div v-if="position === 'detail'" class="action-bar flex justify-between items-center gap-4">
                    <ButtonVue class="btn-primary" :handleClick="toggleModal" >
                        <CommentIcon />
                        Trả lời
                    </ButtonVue>
                    <ButtonVue class="btn-info">
                        <Like />
                        14
                    </ButtonVue>
                    <ButtonVue class="btn-secondary">
                        <Dislike />
                        5
                    </ButtonVue>
                </div>
            </div>
        </div>
    </router-link>
</template>



<style scoped>
.post {
    @apply bg-white py-7 px-8 rounded-md shadow-md relative;
}

/* HEAD */
.post-head .poster {
    @apply grid grid-cols-[40px_1fr] grid-rows-2 gap-x-3 gap-y-1 mb-4;
}

.poster img {
    @apply col-span-1 col-start-1 row-start-1 row-span-2;
}

.poster .poster-name {
    @apply text-sm;
}

.poster .post-time {
    @apply text-xs text-secondary;
}

/* BODY */
.post-body {
    @apply my-4;
}

.post-body .title {
    @apply font-bold mb-2;
}

.post-body .content {
    @apply text-sm text-secondary;
}

/* FOOT */
.post-foot {
    @apply flex justify-between items-center;
}

.post-foot .reaction button {
    @apply btn-ghost btn-sm px-0 text-secondary flex gap-1 items-center;
}

.post-foot .reaction button.liked {
    @apply text-primary;
}

.post-foot .action-bar button {
    @apply text-white flex gap-1 items-center btn-sm text-sm;
}
</style>