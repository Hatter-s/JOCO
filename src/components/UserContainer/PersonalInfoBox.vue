<template>
    <router-link :to="({ name: 'user-info', params: {info: changeNameToType(type) }})">
        <div class="icon-container">
            <slot name="icon">

            </slot>
        </div>

        <h3 class="text-lg font-bold">{{ title }}</h3>
        <p v-if="content">
            {{ content }} 
            {{ unit }} 
            <span v-if="title === 'Tập luyện'">- {{ time }}</span>
        </p>
        <p v-else>- {{ unit }}</p>
    </router-link>
</template>

<script setup lang="ts">
import { changeNameToType } from '@/utils/handle-health';

const props = defineProps<{
    title: string;
    content: number;
    unit: string;
    time: string | null;
    type: string
}>();
</script>

<style scoped>
a {
    @apply rounded-lg shadow-md p-6 pr-10 text-left bg-white;
}

.icon-container {
    @apply bg-primary/20 w-[min-content] p-2 flex justify-center items-center rounded-lg text-primary mb-6;
}

a:hover {
    background-image: linear-gradient(225deg, #FFF 0%, #F48023 100%);
}

a:hover .icon-container{
    @apply bg-orange-600 text-white;
}
button:hover :is(h3, p) {
    @apply text-white;
}

button:active {
    @apply drop-shadow-md opacity-90;
}

</style>