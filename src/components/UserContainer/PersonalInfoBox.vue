<template>
    <div>
        <div>
            <slot name="icon">

            </slot>
        </div>
        
        <h3>{{ title }}</h3>
        <p>{{ content }}</p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        title: string;
        content: string;
    }>();
</script>

<style scoped>

</style>