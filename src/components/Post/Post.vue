<script setup lang="ts">
import { ref } from 'vue';
import type { DeletedPost, Post } from '@/types';
import { getFileURL } from '@/api';
import { absPathToBase64 } from '@/utils/handle-image';
import { useAuthStore, usePostStore, useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const IMG_URL = import.meta.env.VITE_GET_IMAGE_URL;

const authStore = useAuthStore();
const userStore = useUserStore();
const postStore = usePostStore();
const { user } = storeToRefs(authStore);

const props = defineProps<{
    position: "in list" | "detail",
    post: Post,
}>();

onMounted(() => {
    // getFileURL(props.post.poster.avatarAddress).then(res => posterAvatar.value = 'data:image/png;base64, ' + res.data.data);


    // if (arrImgAbsPath.value === null) {
    //     arrImgBase64.value = [];
    // }
    // else {
    //     arrImgAbsPath.value.forEach((absPath) => getFileURL(absPath).then(res => {

    //         if (arrImgBase64.value === null) {

    //         } else {
    //             arrImgBase64.value = [...arrImgBase64.value, ('data:image/png;base64, ' + res.data.data)]
    //         }

    //     }))
    // }

    if (props.position === "detail") {
        if (user.value?.id !== undefined) {
            
            userStore.getReactions(user.value.id)
        }
    }
})



const showModal = ref<boolean>(false);
const toggleModal = (): void => {
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

    const data: DeletedPost = {
        userId: user.value!.id,
        postId: props.post.postId
    }

    postStore.deletePosts(data);

}

//change post
const showChangeModal = ref<boolean>(false);
const toggleChangeModal = (): void => {
    showChangeModal.value = !showChangeModal.value;
}

// const posterAvatar = ref<string>('');

// const arrImgBase64 = ref<string[]>([]);

// handle image in content
// const arrImgAbsPath = computed<string[] | null>(() => {

//     return props.post.content.match(/(?<=(src="))[^\"]+(?=")/g)
// });

// const changeUrlContent = computed(() => {
//     return absPathToBase64(props.post.content, arrImgBase64.value, arrImgAbsPath.value);
// });

const tagName = computed(() => {
    const result = '';
    if (!props.post.tags) {
        for (let tag of props.post.tags) {

        }
    }
    return result;
})


// const isLike = computed(() => {
//     console.log(user.value);
    
//     return userStore.getReaction(true, props.post.postId)
// })

</script>

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

    <!-- add comment modal -->
    <AddComment :handleToggle="toggleModal" :showModal="showModal" :commenterTagName="post!.poster.tagName" :parentId="null"
        :postId="post.postId" v-if="position === 'detail'" />

    <!-- change comment modal -->
    <ChangePost :handle-toggle="toggleChangeModal" :show-modal="showChangeModal" :user="authStore.user"
        :content="post.content" :title="post.title" :tagName="post.tags" :postId="post.postId" v-if="position === 'detail'" />
    <div class="post" :class="{ 'mb-4': position === 'in list' }">
        <router-link :to="{ name: 'post', params: { id: post?.postId } }" v-if="position === 'in list'"
            class=" bg-transparent absolute inset-0"></router-link>

        <div v-if="user?.id === post.poster.id && position === 'detail'">
            <ButtonVue class="absolute right-7 top-8 text-secondary btn-sm p-0 rounded-none btn-ghost"
                :handle-click="toggleMoreData">
                <More class="" />
            </ButtonVue>
            <div v-if="moreData" class="absolute w-max bg-white right-16 shadow-md top-8 drop-shadow-md">
                <p class="deletePost p-4 cursor-pointer" @click="toggleDeleteModal">Xoa bai viet</p>
                <hr>
                <p class="changePost p-4 cursor-pointer" @click="toggleChangeModal">Thay doi</p>
            </div>
        </div>

        <div class="post-head">
            <div class="poster">
                <img :src="IMG_URL + post.poster.avatarAddress" alt="poster-image"
                    class="h-[40px] w-[40px] rounded-full  aspect-square object-cover">
                <p class="poster-name">
                    {{ post.poster.tagName }}
                </p>
                <p class="post-time">
                    {{ post.createTime }}
                </p>
            </div>
        </div>
        <div class="post-body">
            <p class="title">{{ post.title }}</p>
            <p class="content" v-html="post.content" v-if="position === 'detail'"></p>
            <p class="content" v-if="position === 'in list'">
                {{ post.content.slice(3, 20) }}
            </p>
        </div>
        <div class="post-foot">
            <div class="tag flex justify-between items-center gap-2">
                <ButtonVue class="btn-xs text-[10px] text-secondary rounded-md" v-for="tag in post.tags">
                    {{ tag }}
                </ButtonVue>
            </div>
            <div v-if="position === 'in list'" class="reaction flex justify-between items-center gap-4">
                <ButtonVue class=" btn-disabled">
                    <Eye />
                    {{ post.watchTime }}
                </ButtonVue>
                <ButtonVue class=" btn-disabled">
                    <CommentIcon />
                    {{ post.countComment }}
                </ButtonVue>
                <ButtonVue>
                    <Like v-if="post.reaction.total >= 0" />
                    <Dislike v-else />
                    {{ post.reaction.total }}
                </ButtonVue>
            </div>

            <div v-if="position === 'detail'" class="action-bar flex justify-between items-center gap-4">
                <ButtonVue class="btn-primary" :handleClick="toggleModal">
                    <CommentIcon />
                    Trả lời
                </ButtonVue>
                <ButtonVue 
                    class="btn-secondary" 
                    :class="{ 'btn-info': userStore.getReaction(true, props.post.postId) === true }"
                    :handleClick="[postStore.likePost, {
                        userId: user?.id,
                        entityId: post.postId,
                        reactionId: post.reactionId,
                        isLike: true,
                        isPost: true
                    }]">
                    <Like />
                    {{ post.reaction.like }}
                </ButtonVue>
                <ButtonVue class="btn-secondary"
                    :class="{ 'btn-error': userStore.getReaction(true, props.post.postId) === false }"
                    :handleClick="[postStore.dislikePost, {
                        userId: user?.id,
                        entityId: post.postId,
                        reactionId: post.reactionId,
                        isLike: false,
                        isPost: true
                    }]">
                    <Dislike />
                    {{ post.reaction.dislike }}
                </ButtonVue>
            </div>
        </div>
    </div>
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