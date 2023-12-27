<template>
    <div class="sort-bar ">
        <ButtonVue 
            class="btn-neutral btn-sort"
            :class="{'btn-info' : postStore.sortMethod === 'byNew'}"
            :handle-click="[changeSortMethod, 'byNew']"
        >
            <Clock/>
            mới nhất
        </ButtonVue>
        <ButtonVue 
            class="btn-neutral btn-sort"
            :class="{'btn-warning' : postStore.sortMethod === 'byLike'}"
            :handle-click="[changeSortMethod, 'byLike']"
        >
            <Hot/>
            top like
        </ButtonVue>
        <ButtonVue 
            class="btn-neutral btn-sort"
            :class="{'btn-error' : postStore.sortMethod === 'byComment'}"
            :handle-click="[changeSortMethod, 'byComment']"
        >
            <CommentIcon />
            top comments
        </ButtonVue>
    </div>
</template>

<script setup lang="ts">
    import { usePostStore } from '@/stores';
    const postStore = usePostStore();
    const changeSortMethod = (method:'byNew' | 'byLike' | 'byComment') => {
        postStore.sortMethod = method;
        // postStore.getListPost(0, 50);
        postStore.sortPost(postStore.sortMethod);
    }
</script>

<style scoped>
    .sort-bar {
        @apply my-4 flex gap-2;
    }
    .btn-sort {
        @apply btn-xs rounded-full flex gap-1
    }
</style>