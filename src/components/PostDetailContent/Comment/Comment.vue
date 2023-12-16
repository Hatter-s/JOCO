<template>
    <AddComment 
        :handleToggle="toggleModal" 
        :showModal="showModal"
        :commenter="comment.commenter"
        :parentId="comment.comment_id"
        :post_id="comment.post_id"
    />
    <div class="comment">
        <More class="absolute right-7 top-8 text-secondary" />
        <div class="comment-head">
            <img :src="comment.commenter.ava_img" alt="commenter_img" />
            <p class="tag-name">
                {{ comment.commenter.tag_name }}
            </p>
            <p class="time">
                {{ comment.create_time }}
            </p>
        </div>
        <div class="comment-body">
            {{ comment.content }}
        </div>
        <hr class="my-4 text-secondary">
        <div class="comment-footer">
            <div class="reaction flex gap-3">
                <ButtonVue 
                    class="flex gap-1 items-center btn-ghost btn-sm hover:btn-info" 
                    :handle-click="[likeComment, comment.comment_id]"
                >
                    <Like/>
                    {{ comment.reaction.like }}
                </ButtonVue>
                <ButtonVue 
                    class="flex gap-1 items-center btn-ghost btn-sm hover:btn-error"
                    :handle-click="[dislikeComment, comment.comment_id]"
                >
                    <Dislike/>
                    {{ comment.reaction.dislike }}
                </ButtonVue>
            </div>
            <div class="handle-answer flex gap-3">
                <ButtonVue v-if="comment.sub_comments" class="btn-ghost text-info btn-sm px-0" :handleClick="toggleDisplaySubComment">
                    <ChevronsUp v-if="displaySubComment"/>
                    <ChevronsDown v-if="!displaySubComment" />

                   {{
                    displaySubComment 
                        ? ` Ẩn câu trả lời (${comment.sub_comments.length})` 
                        :  `Hien cau tra loi (${comment.sub_comments.length})`
                    }}
                </ButtonVue>
                <ButtonVue class="btn-ghost text-info btn-sm px-0" :handleClick="toggleModal">
                    <Reply/>
                    Trả lời
                </ButtonVue>
            </div>
        </div>
    </div>
    <div v-if="displaySubComment">
        <SubComment 
            v-for="subComment in sortSubCommentByTime"
            :sub-comment="subComment"
            :reply-to="comment.commenter.tag_name"
            :key="subComment.create_time"
        />
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type Comment } from '@/types/types';

const props = defineProps<{
    comment: Comment
    likeComment: (id: number) => void,
    dislikeComment: (id: number) => void
}>();

const sortSubCommentByTime = computed(() => {
    
    return props.comment.sub_comments.sort((a, b) => {
        let DateA = new Date(a.create_time);
        let DateB = new Date(b.create_time);
        if( DateA.getTime() > DateB.getTime()){
            return 1;
        }else if( DateA.getTime() < DateB.getTime() ) {
            return -1;
        }
        return 0;
    })
})


const displaySubComment = ref<boolean>(false);
const toggleDisplaySubComment = () => {
    displaySubComment.value = !displaySubComment.value
}

const showModal = ref<boolean>(false);
const toggleModal = () :void => {    
    showModal.value = !showModal.value;
}
</script>

<style scoped>
.comment {
    @apply bg-white py-7 px-8 rounded-md shadow-md relative my-5;
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