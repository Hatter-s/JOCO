<template>
    <div class="sort-bar ">
        <ButtonVue class="btn-info btn-sort ">
            <Clock/>
            mới nhất
        </ButtonVue>
        <ButtonVue class="btn-neutral btn-sort">
            <Hot/>
            top like
        </ButtonVue>
        <ButtonVue class="btn-neutral btn-sort">
            <Comment />
            top comments
        </ButtonVue>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .sort-bar {
        @apply my-4 flex gap-2;
    }
    .btn-sort {
        @apply btn-xs rounded-full flex gap-1
    }
</style>