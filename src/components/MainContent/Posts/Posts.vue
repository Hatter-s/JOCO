<template>
    <div>
        <Post
            v-for="post in postsList"
            :post="post" 
            position="in list"
            :likePost="postStore.likePost"
            :dislikePost="postStore.dislikePost"
        />
    </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores';
import { storeToRefs  } from 'pinia';
import { computed } from 'vue';

const postStore = usePostStore();
const { posts } = storeToRefs(postStore);
const postsList = computed(() => {
    if (!posts) return [];
    return postStore.posts; 
})

</script>

<style scoped>

</style>