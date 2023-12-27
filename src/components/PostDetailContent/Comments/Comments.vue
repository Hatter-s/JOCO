<template>
    <div>
        <p class="text-center text-info text-2xl my-5">Câu trả lời</p>
        <div v-if="comments">
            <Comment 
            v-for="comment in comments"
            :comment="comment"
        />
        </div>



        <!-- <Comment v-if="seeMore"/>
        <div class="flex justify-center">
            <ButtonVue class="text-center text-info my-5 underline bg-white btn-md" :handleClick="handleSeeMore">Hiển thị thêm</ButtonVue>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCommentStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { useRoute } from "vue-router";

onMounted(() => {
    commentStore.getCommentsByPostId(props.postId, 0, 50); 
})

const props = defineProps<{
    postId: number
}>()

const route = useRoute()
const commentStore = useCommentStore();
const { comments } = storeToRefs(commentStore);

// const sortByTime = computed(() => {
    
//     return comments.value.sort((a, b) => {
//         let DateA = new Date(a.create_time);
//         let DateB = new Date(b.create_time);

//         if( DateA.getTime() > DateB.getTime()){
//             return 1;
//         }else if( DateA.getTime() < DateB.getTime() ) {
//             return -1;
//         }
//         return 0;
//     })
// })
const seeMore = ref<Boolean>(false);

const handleSeeMore = () => {
    seeMore.value = true;
}
</script>

<style scoped>

</style>