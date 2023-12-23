<template>
    <button>
        <div class="icon-container">
            <slot name="icon">

            </slot>
        </div>

        <h3 class="text-lg font-bold">{{ title }}</h3>
        <p>{{ content }}</p>
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    content: string;
}>();
</script>

<style scoped>
button {
    @apply rounded-lg shadow-md p-6 pr-10 text-left;
}

.icon-container {
    @apply bg-primary/20 w-[min-content] p-2 flex justify-center items-center rounded-lg text-primary mb-6;
}

button:hover {
    background-image: linear-gradient(225deg, #FFF 0%, #F48023 100%);
}

button:hover .icon-container{
    @apply bg-orange-600 text-white;
}
button:hover :is(h3, p) {
    @apply text-white;
}

button:active {
    @apply drop-shadow-md opacity-90;
}

</style>