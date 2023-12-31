<template>
        <!-- error modal -->
        <dialog class="modal" :class="{ 'modal-open': showDeleteModal }">
        <div class="modal-box mim-w-[1000px]">
            <form action="POST" @submit="(e: Event) => {
                handleDeletePost(e);
            }">
                Ban chac chan chu? hanh dong nay se khong the hoan lai
                <div class="flex gap-3 justify-end">
                    <ButtonVue class="btn btn-sm" :handleClick="toggleDeleteModal">Close</ButtonVue>
                    <ButtonVue class="btn btn-error text-white btn-sm" type="submit">
                        Xoa
                    </ButtonVue>
                </div>
            </form>
        </div>
    </dialog>

    <AddComment 
        :handleToggle="toggleModal" 
        :showModal="showModal"
        
        :parentId="comment.id"
        :postId="comment.postId"
        :commenter-tag-name="comment.userDTO?.tagName"
        v-if="comment.parentId === null"
    />
    <ChangeComment 
        :handleToggle="toggleChangeModal" 
        :showModal="showChangeModal"
        
        :id="comment.id"
        :content="comment.content"
        :postId="comment.postId"
        :commenter-tag-name="comment.userDTO?.tagName"
        :parentId="comment.parentId"
    />
    <div :class="comment.parentId ? 'sub-comment' : 'comment'">
        <div v-if="user?.id === comment.userDTO.id">
            <ButtonVue class="absolute right-7 top-8 text-secondary btn-sm p-0 rounded-none btn-ghost"
                :handle-click="toggleMoreData">
                <More class="" />
            </ButtonVue>
            <div v-if="moreData" class="absolute w-max bg-white right-16 shadow-md top-8 drop-shadow-md">
                <p class="deletePost p-4 cursor-pointer" @click="toggleDeleteModal">Xoa binh luan</p>
                <hr>
                <p class="changePost p-4 cursor-pointer" @click="toggleChangeModal">Thay doi</p>
            </div>
        </div>

        <div class="comment-head" v-if="comment.parentId === null">
            <img :src="IMG_URL + comment.userDTO.avatarAddress" alt="commenter_img" />
            <p class="tag-name">
                {{ comment.userDTO.tagName }}
            </p>
            <p class="time">
                {{ comment.createTime }}
            </p>
        </div>

        <!-- BODY -->
        <div class="comment-body" v-if="comment.parentId === null">
            {{ comment.content }}
        </div>
        <div class="comment-body" v-if="comment.parentId">
            <!-- <b>{{ replyTo }}</b> -->
            {{ comment.content }}
        </div>

        <hr class="my-4 text-secondary">

        <!-- FOOTER -->
        <div class="comment-footer" v-if="comment.parentId === null">
            <div class="reaction flex gap-3">
                <ButtonVue 
                    class="flex gap-1 items-center btn-ghost btn-sm hover:btn-info" 
                    :handle-click="[commentStore.likeComment, {
                        userId: user?.id,
                        entityId: comment.id,
                        reactionId: comment.reactionId,
                        isLike: true,
                        isPost: false
                    }]"
                >
                    <Like/>
                    {{ comment.reactionDTO.like }}
                </ButtonVue>
                <ButtonVue 
                    class="flex gap-1 items-center btn-ghost btn-sm hover:btn-error"
                    :handle-click="[commentStore.dislikeComment, {
                        userId: user?.id,
                        entityId: comment.id,
                        reactionId: comment.reactionId,
                        isLike: false,
                        isPost: false
                    }]"
                >
                    <Dislike/>
                    {{ comment.reactionDTO.dislike }}
                </ButtonVue>
            </div>
            <div class="handle-answer flex gap-3">
                <!-- <ButtonVue v-if="comment.sub_comments" class="btn-ghost text-info btn-sm px-0" :handleClick="toggleDisplaySubComment">
                    <ChevronsUp v-if="displaySubComment"/>
                    <ChevronsDown v-if="!displaySubComment" />

                   {{
                    displaySubComment 
                        ? ` Ẩn câu trả lời (${comment.sub_comments.length})` 
                        :  `Hien cau tra loi (${comment.sub_comments.length})`
                    }}
                </ButtonVue> -->
                <ButtonVue class="btn-ghost text-info btn-sm px-0" :handleClick="toggleModal">
                    <Reply/>
                    Trả lời
                </ButtonVue>
            </div>
        </div>
        <div class="comment-footer" v-if="comment.parentId">
            <p class="text-secondary">bởi {{ comment.userDTO.tagName }}</p>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Comment, DeletedComment } from '@/types';
import { getFileURL } from '@/api';
import { useAuthStore, useCommentStore, useUserStore } from '@/stores';

import { storeToRefs } from 'pinia';

const IMG_URL = import.meta.env.VITE_GET_IMAGE_URL;

const authStore = useAuthStore();
const commentStore = useCommentStore();
const { user } = storeToRefs(authStore);
onMounted(() => {
    // getFileURL(props.comment.userDTO.avatarAddress).then(res => commenterAvatar.value = 'data:image/png;base64, ' + res.data.data);

})

const props = defineProps<{
    comment: Comment
}>();

const commenterAvatar = ref<string>();

const showModal = ref<boolean>(false);
const toggleModal = () :void => {    
    showModal.value = !showModal.value;
}

const moreData = ref<boolean>(false);
const toggleMoreData = (): void => {
    moreData.value = !moreData.value;
}

//delete post
const showDeleteModal = ref<boolean>(false);
const toggleDeleteModal = () => {
    showDeleteModal.value = !showDeleteModal.value;
}
const confirmDeletePost = ref<boolean>(false);
const handleDeletePost = (e: Event) => {
    e.preventDefault();

    toggleDeleteModal();
    confirmDeletePost.value = true;

    const data: DeletedComment = {
        userId: user.value!.id,
        postId: props.comment.postId,
        id: props.comment.id,
        content: '',
        parentId: props.comment.parentId
    }

    commentStore.deleteComment(data);

}

//change post
const showChangeModal = ref<boolean>(false);
const toggleChangeModal = (): void => {
    showChangeModal.value = !showChangeModal.value;
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

.sub-comment {
    @apply bg-white py-7 px-16 ml-6 rounded-md shadow-md relative my-5;
}

.sub-comment::before {
    content: "";
    @apply left-0 top-0 bottom-0 w-[10px] bg-info/50 absolute;
}

.comment-footer {
    @apply flex justify-between;
}

</style>