<template>
    <div class="main-content navbar-spacing py-4">
        <SearchBar v-if="!userId" />
        <ButtonVue class="w-full" :handle-click="() => router.push({name: 'user'})" v-if="userId">Trở lại</ButtonVue>
        <SortBar/>
        <Posts />
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const userId = route.params.id;

</script>

<style scoped>

</style>
