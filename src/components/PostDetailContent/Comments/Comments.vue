<template>
    <div>
        <p class="text-center text-info text-2xl my-5">Câu trả lời</p>
        <Comment/>
        <SubComment/>
        <SubComment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>

        <Comment v-if="seeMore"/>
        <div class="flex justify-center">
            <ButtonVue class="text-center text-info my-5 underline bg-white btn-md" :handleClick="handleSeeMore">Hiển thị thêm</ButtonVue>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const seeMore = ref<Boolean>(false);

const handleSeeMore = () => {
    seeMore.value = true;
}
</script>

<style scoped>

</style>