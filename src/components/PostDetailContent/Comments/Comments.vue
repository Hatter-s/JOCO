<template>
    <div>
        <p class="text-center text-info text-2xl my-5">Câu trả lời</p>
        <Comment 
            v-for="comment in getPostComments"
            :comment="comment"
            :likeComment="commentStore.likeComment"
            :dislikeComment="commentStore.dislikeComment"
        />


        <!-- <Comment v-if="seeMore"/>
        <div class="flex justify-center">
            <ButtonVue class="text-center text-info my-5 underline bg-white btn-md" :handleClick="handleSeeMore">Hiển thị thêm</ButtonVue>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePostStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { useRoute} from "vue-router";

const route = useRoute()
const postId = route.params.id;

const commentStore = usePostStore();
const { comments } = storeToRefs(commentStore);

const getPostComments = computed(() => {
    const postComment = comments.value.filter((comment) => comment.post_id === Number(postId));

        
    return postComment.sort((a, b) => {
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

const sortByTime = computed(() => {
    
    return comments.value.sort((a, b) => {
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
const seeMore = ref<Boolean>(false);

const handleSeeMore = () => {
    seeMore.value = true;
}
</script>

<style scoped>

</style>