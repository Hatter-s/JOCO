<template>
    <div class="bg-white rounded-md shadow-md w-[240px]">
        <img :src="Ava" alt="poster-img" class="h-[200px] max-w-[200px] object-cover rounded-full p-5 box-content">
        <p class="poster-tag text-center font-bold text-lg pb-5">
            @Golanginya
        </p>
        <hr/>
        <p class="flex justify-center gap-2 items-center text-xl py-5 text-primary">
            <Award/>
            125
        </p>
    </div>
</template>

<script setup lang="ts">
import Ava from "@/assets/image/users/Ava.jpeg";

</script>

<style scoped>

</style>