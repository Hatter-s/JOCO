<script setup lang="ts">
import Ava from "@/assets/image/users/Ava.jpg";
</script>

<template>
    <div class="post">
        <div class="post-head">
            <div class="poster">
                <img :src="Ava" alt="poster-image">
                <p class="poster-name">Golanginya</p>
                <p class="post-time">5 phút trước</p>
            </div>
        </div>
        <div class="post-body">
            <p class="title">How to patch KDE on FreeBSD?</p>
            <p class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla
            </p>
        </div>
        <div class="post-foot">
            <div class="tag">
                <ButtonVue>golang</ButtonVue>
                <ButtonVue>linux</ButtonVue>
                <ButtonVue>overflow</ButtonVue>
            </div>
            <div class="reaction">
                <ButtonVue class="btn-ghost">
                    <Eye/>
                    125
                </ButtonVue>
                <ButtonVue class="btn-ghost">
                    <Comment/>
                    15
                </ButtonVue>
                <ButtonVue class="btn-ghost">
                    <Like />
                    155
                </ButtonVue>
            </div>
        </div>
    </div>
</template>



<style scoped>
.post {
    @apply bg-white py-7 px-8;
}
/* HEAD */
.post-head .poster{
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
.post-body .title {
    @apply font-bold mb-2;
}

.post-body .content {
    @apply text-sm text-secondary;
}

/* FOOT */

</style>