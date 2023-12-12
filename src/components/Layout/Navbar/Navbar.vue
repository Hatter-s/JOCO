<script setup lang="ts">
import PlusCircle from "@/assets/image/icons/plus-circle.svg";
</script>
<template>
	<nav class="bg-[var(--white-clr)] shadow-md navbar-spacing">
		<div class="flex justify-between flex-1 items-center navbar-height">
			<p class="subtitle-text font-bold">Bài đăng</p>
			<ButtonVue type="button" class="py-3 px-5 flex gap-3 rounded bg-[var(--primary-clr)] btn-primary text-white items-center">
				<img :src="PlusCircle" alt="plus icon">
				Đăng bài
			</ButtonVue>
		</div>
	</nav>
</template>

<style scoped></style>
