<template>
    <dialog class="modal" :class="{ 'modal-open': showModal }">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Answer to {{ tagName }}</h3>
            <form action="POST">
                <textarea class="textarea textarea-bordered w-full my-4" name="reply" id="reply" rows="10"
                    placeholder="Type here your wise answer"></textarea>
                <div class="flex gap-3 justify-end">
                    <ButtonVue class="btn btn-sm" :handleClick="handleToggle">Close</ButtonVue>
                    <ButtonVue class="btn btn-primary text-white btn-sm" :handleClick="handleToggle" type="submit">
                        <CommentIcon />
                        Trả lời
                    </ButtonVue>
                </div>
            </form>

        </div>

    </dialog>
</template>

<script setup lang="ts">
const props = defineProps
    <{
        handleToggle: any
        showModal: Boolean
        tagName: String
    }>();

</script>

<style scoped></style>