<script setup lang="ts">
import Logo from "@/assets/image/logo.svg";
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<template>
    <nav class="bg-[var(--white-clr)] shadow-md navbar-spacing">
        <div class="flex justify-between flex-1 items-center navbar-height">
            <div class="navbar-height relative">
			<img :src="Logo" alt="logo" class="relative top-1/2 -translate-y-1/2" />
		</div>

            <div class="flex gap-4">
                <ButtonVue type="button" class="py-3 px-5 flex gap-3 rounded text-white items-center btn-outline btn-info bg-transparent border-none" :handle-click="()=> {router.push({ name: 'login'})}">
                    Đăng nhập
                </ButtonVue>
                <ButtonVue 
                    type="button"
                    class="py-3 px-5 flex gap-3 rounded bg-[var(--primary-clr)] btn-primary text-white items-center" 
                    :handle-click="()=> {router.push({ name: 'register' })}">
                    <UserPlus class="mr-1" />
                    Đăng ký
                </ButtonVue>
            </div>

        </div>
    </nav>
</template>

<style scoped></style>
