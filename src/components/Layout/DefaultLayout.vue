<template>
    <div class="contain">
        <Navbar/>
        <Sidebar />
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
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: auto 1fr;
    grid-auto-flow: unset;
    min-height: 100vh;
  }

  .sidebar {
    grid-column:1 / 1;
    grid-row: 1 / span 2;
  }
</style>