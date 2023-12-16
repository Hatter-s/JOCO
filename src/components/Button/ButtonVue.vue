<template>
<button 
    class="btn normal-case font-normal hover:opacity-80" 
    :type="props.type? props.type: 'button'"
    @click="() => {
        if(Array.isArray(handleClick)) {
            handleClick[0](handleClick[1]);
        }
        else {
            handleClick();
        }
    }"
>
    <slot>
        Button
    </slot>
</button>
</template>

<script setup lang="ts">
const props = defineProps<{
    type?:"button" | "submit" | "reset" | undefined
    handleClick?:any | [any, Number]
}>();

</script>

<style scoped>

</style>