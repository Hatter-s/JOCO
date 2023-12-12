<template>
<button 
    class="btn normal-case font-normal hover:opacity-80" 
    :type="props.type? props.type: 'button'">
    <slot>
        Button
    </slot>
</button>
</template>

<script setup lang="ts">
const props = defineProps<{
    type?:"button" | "submit" | "reset" | undefined
}>();

</script>

<style scoped>

</style>