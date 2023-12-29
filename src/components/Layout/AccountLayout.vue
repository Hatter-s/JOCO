<template>
    <div class="contain">
        <AccountNavbar/>
        <section class="content">
            <slot>

            </slot>
        </section>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .contain {
        @apply flex flex-col h-[100vh] bg-white;
    }

</style>