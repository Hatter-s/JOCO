<script setup lang="ts">
import { ref } from 'vue';
import  type { Post } from '@/types';

// import { usePostStore } from "@/stores";

const props = defineProps<{
    position: "in list" | "detail",
    post: Post,
    likePost: (id: number) => void,
    dislikePost: (id: number) => void,
}>();

// const postStore = usePostStore()

const showModal = ref<boolean>(false);
const toggleModal = () :void => {    
    showModal.value = !showModal.value;
}

</script>

<template>
    <AddComment 
        :handleToggle="toggleModal" 
        :showModal="showModal"
        :commenter="post?.poster"
        parentId= "this"
        :post_id="post.post_id"
    />
    <router-link :to="{ name: 'post', params:{ id: post?.post_id}}">
        <div class="post" :class="{'mb-4': position === 'in list'}">
            <More class="absolute right-7 top-8 text-secondary" />
            <div class="post-head">
                <div class="poster">
                    <img :src="post.poster.ava_img" alt="poster-image" class="h-[40px] w-[40px] rounded-full  aspect-square object-cover">
                    <p class="poster-name">
                        {{ post.poster.tag_name }}
                    </p>
                    <p class="post-time">
                        {{ post.create_time }}
                    </p>
                </div>
            </div>
            <div class="post-body">
                <p class="title">{{ post.title }}</p>
                <p class="content" v-html="post.content">
                </p>
            </div>
            <div class="post-foot">
                <div class="tag flex justify-between items-center gap-2">
                    <ButtonVue class="btn-xs text-[10px] text-secondary rounded-md" v-for="tag in post.tags.split(' ')">
                        {{ tag }}
                    </ButtonVue>
                </div>
                <div v-if="position === 'in list'" class="reaction flex justify-between items-center gap-4">
                    <ButtonVue class=" btn-disabled">
                        <Eye />
                        {{ post.views }}
                    </ButtonVue>
                    <ButtonVue class=" btn-disabled">
                        <CommentIcon />
                        {{ post.comments }}
                    </ButtonVue>
                    <ButtonVue>
                        <Like v-if="post.reaction.total > 0"/>
                        <Dislike v-else />
                        {{ post.reaction.total }}
                    </ButtonVue>
                </div>
                <div v-if="position === 'detail'" class="action-bar flex justify-between items-center gap-4">
                    <ButtonVue class="btn-primary" :handleClick="toggleModal" >
                        <CommentIcon />
                        Trả lời
                    </ButtonVue>
                    <ButtonVue class="btn-info" :handleClick="[likePost, post?.post_id]">
                        <Like />
                        {{ post.reaction.like }}
                    </ButtonVue>
                    <ButtonVue class="btn-secondary" :handleClick="[dislikePost, post?.post_id]">
                        <Dislike />
                        {{ post.reaction.dis_like }}
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