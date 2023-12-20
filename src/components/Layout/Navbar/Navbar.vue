<script setup lang="ts">
import PlusCircle from "@/assets/image/icons/plus-circle.svg";

import { useAuthStore } from "@/stores";
import { useUsersStore } from "@/stores";

const authStore = useAuthStore();
const { logout } = useAuthStore();

const showModal = ref<boolean>(false);
const toggleModal = () :void => {    
    showModal.value = !showModal.value;
}
</script>
<template>
	<nav class="bg-[var(--white-clr)] shadow-md navbar-spacing">
		<div class="flex justify-between flex-1 items-center navbar-height">
			<p class="subtitle-text font-bold">Bài đăng</p>
			<div class="flex gap-4">
				<ButtonVue type="button"
					class="py-3 px-5 flex gap-3 rounded bg-[var(--primary-clr)] btn-primary text-white items-center" :handle-click="toggleModal">
					<img :src="PlusCircle" alt="plus icon">
					Đăng bài
				</ButtonVue>
				<ButtonVue class="py-3 px-5 flex gap-3 rounded bg-[var(--primary-clr)]text-white items-center btn-outline"
					:handle-click="logout">
					Logout
				</ButtonVue>
			</div>
		</div>
		<AddPost 
			:handleToggle="toggleModal" 
        	:showModal="showModal"
        	:commenter="authStore.user"
        	:parentId="1"
        	:post_id="1"
		/>
	</nav>
</template>

<style scoped>

</style>
