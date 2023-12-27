<template>
    <label for="search" class="subtitle-text background-white">
        <ButtonVue class="btn-sm px-0 h-auto btn-ghost" :handle-click="handleSearch">
            <Search />
        </ButtonVue>

        <input type="text" id="search" name="search" placeholder="Tìm kiếm" v-model="searchText">
    </label>
</template>

<script setup lang="ts">
import { usePostStore  } from '@/stores';

const postStore = usePostStore();
const searchText = ref<string>('');

const handleSearch = async () => {
    await postStore.searchPost(searchText.value, 0 ,50);
}
</script>

<style scoped>

label {
    @apply flex w-full gap-2 py-3 shadow-md rounded-md px-4 items-center;
}

label input{
    @apply border-none outline-none bg-transparent flex-1 text-black placeholder:text-secondary;
}

</style>