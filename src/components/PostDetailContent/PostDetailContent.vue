<template>
    <div class="post-detail-content navbar-spacing">
        <Post position="detail"/>
        <PosterInfo class="poster-info" />
        <Comments/>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.post-detail-content {
    @apply py-4 grid grid-cols-[1fr_min-content] gap-x-6;
}

.poster-info {
    @apply col-start-2 col-span-1 row-start-1 row-span-2 h-min;
}
</style>
