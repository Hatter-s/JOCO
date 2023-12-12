<template>
<button 
    class="btn normal-case font-normal hover:opacity-80" 
    :type="props.type? props.type: 'button'"
    @click="handleClick"
>
    <slot>
        Button
    </slot>
</button>
</template>

<script setup lang="ts">
const props = defineProps<{
    type?:"button" | "submit" | "reset" | undefined
    handleClick?:any
}>();

</script>

<style scoped>

</style>