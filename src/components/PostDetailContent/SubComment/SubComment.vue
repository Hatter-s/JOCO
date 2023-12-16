<template>
    <div class="sub-comment">
        <div class="comment-body">
            <b>{{ replyTo }}</b>
            {{ subComment.content }}
        </div>
        <hr class="my-4 text-secondary">
        <div class="comment-footer">
            <p class="text-secondary">bởi {{ subComment.commenter.tag_name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SubComment } from '@/types/types';

const props = defineProps<{
    subComment: SubComment
    replyTo: String
}>();
</script>

<style scoped>
.sub-comment {
    @apply bg-white py-7 px-16 rounded-md shadow-md relative my-5;
}

.sub-comment::before {
    content: "";
    @apply left-6 top-0 bottom-0 w-[10px] bg-info/50 absolute;
}

.comment-footer {
    @apply flex justify-between;
}


</style>