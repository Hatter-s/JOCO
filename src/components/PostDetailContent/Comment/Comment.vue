<template>
    <AddComment :handleToggle="toggleModal" :showModal="showModal" tagName="@morgenshtern" />
    <div class="comment">
        <More class="absolute right-7 top-8 text-secondary" />
        <div class="comment-head">
            <img :src="OldMan" alt="commenter_img" />
            <p class="tag-name">@morgenshtern</p>
            <p class="time">12 Tháng 11 2020 19:35</p>
        </div>
        <div class="comment-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis.
            Pharetra ut integer nibh urna. Placerat ut adipiscing nulla lectus vulputate massa, scelerisque. Netus nisl
            nulla placerat dignissim ipsum arcu.
            <div class="mockup-code mt-4 py-2">
                <pre data-prefix="$"><code>package main</code></pre>
            </div>
        </div>
        <hr class="my-4 text-secondary">
        <div class="comment-footer">
            <div class="reaction flex gap-3">
                <div class="flex gap-1 items-center">
                    <Like/>
                    12
                </div>
                <div class="flex gap-1 items-center">
                    <Dislike/>
                    3
                </div>
            </div>
            <div class="handle-answer flex gap-3">
                <ButtonVue class="btn-ghost text-info btn-sm px-0">
                    <ChevronsUp/>
                    Ẩn câu trả lời (2)
                </ButtonVue>
                <ButtonVue class="btn-ghost text-info btn-sm px-0" :handleClick="toggleModal">
                    <Reply/>
                    Trả lời
                </ButtonVue>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import OldMan from '@/assets/image/users/old-man.jpeg';
import { ref } from 'vue'

const showModal = ref<Boolean>(false);
const toggleModal = () :void => {    
    showModal.value = !showModal.value;
}
</script>

<style scoped>
.comment {
    @apply bg-white py-7 px-8 rounded-md shadow-md relative;
}

.comment::before {
    content: "";
    @apply left-0 top-0 bottom-0 w-[5px] bg-primary/50 absolute;
}
.comment-head {
    @apply grid grid-cols-[40px_1fr] grid-rows-2 gap-x-3 gap-y-1 mb-4;
}

.comment-head img {
    @apply col-span-1 col-start-1 row-start-1 row-span-2 h-[40px] w-[40px] rounded-full aspect-square object-cover;
}

.comment-head .tag-name {
    @apply text-sm;
}

.comment-head .time {
    @apply text-xs text-secondary;
}

.comment-footer {
    @apply flex justify-between;
}


</style>