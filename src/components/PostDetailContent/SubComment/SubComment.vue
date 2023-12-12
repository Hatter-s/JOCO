<template>
    <div class="comment">
        <div class="comment-body">
            <b>@unkind</b>, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.
        </div>
        <hr class="my-4 text-secondary">
        <div class="comment-footer">
            <p class="text-secondary">bởi @lazyReplyer</p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.comment {
    @apply bg-white py-7 px-16 rounded-md shadow-md relative my-5;
}

.comment::before {
    content: "";
    @apply left-6 top-0 bottom-0 w-[10px] bg-info/50 absolute;
}

.comment-footer {
    @apply flex justify-between;
}


</style>