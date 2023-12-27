<template>
    <div>
        <Post
            v-for="post in postsList"
            :post="post" 
            position="in list"
        />
    </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores';
import { storeToRefs  } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
    if(route.params.id) {
        postStore.getPostsByUserId(Number(route.params.id), 0 ,50)
    }   else {
        postStore.getListPost(0, 50);
    }
})

const postStore = usePostStore();
const { posts } = storeToRefs(postStore);
const postsList = computed(() => {
    if (!posts) return [];
    return postStore.posts; 
})

</script>

<style scoped>

</style>