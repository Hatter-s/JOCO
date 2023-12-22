<template>
    <div class="post-detail-content navbar-spacing" v-if="currentPost">
        <Post
            v-if="postStore"
            position="detail"
            :post="currentPost!"
            :likePost="postStore.likePost"
            :dislikePost="postStore.dislikePost"
        />
        <PosterInfo class="poster-info" />
        <Comments/>
    </div>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores';
import { computed, onMounted } from 'vue';
import { useRoute} from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();

onMounted(() => {
    if(typeof route.params.id === 'string') {
        postStore.getPostById(route.params.id);
    }
})

const postStore = usePostStore();

const { currentPost } = storeToRefs(postStore);

</script>

<style scoped>
.post-detail-content {
    @apply py-4 grid grid-cols-[1fr_min-content] gap-x-6;
}

.poster-info {
    @apply col-start-2 col-span-1 row-start-1 row-span-2 h-min;
}
</style>
