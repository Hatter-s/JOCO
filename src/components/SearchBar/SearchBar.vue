<template>
    <label for="search" class="subtitle-text background-white">
        <Search />
        <input type="text" id="search" name="search" placeholder="Tìm kiếm" v-model="homeStore.$state.searchValue">
    </label>
</template>

<script setup lang="ts">
import { useHomeStore } from '../../stores';

const homeStore = useHomeStore();

</script>

<style scoped>

label {
    @apply flex w-full gap-2 py-3 shadow-md rounded-md px-4 items-center;
}

label input{
    @apply border-none outline-none bg-transparent flex-1 text-black placeholder:text-secondary;
}

</style>