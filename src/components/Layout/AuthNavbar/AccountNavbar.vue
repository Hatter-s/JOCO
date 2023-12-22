<script setup lang="ts">
import Logo from "@/assets/image/logo.svg";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const currentParam = route.name

</script>
<template>
    <nav class="bg-[var(--white-clr)] shadow-md navbar-spacing">
        <div class="flex justify-between flex-1 items-center navbar-height">
            <div class="navbar-height relative">
			<img :src="Logo" alt="logo" class="relative top-1/2 -translate-y-1/2" />
		</div>

            <div class="flex gap-4">
                <ButtonVue 
                    type="button" 
                    :class="route.name === 'login' ? 'loginActive' : 'loginNormal'" 
                    :handle-click="()=> {router.push({ name: 'login'})}">
                    Đăng nhập
                </ButtonVue>
                <ButtonVue 
                    type="button"
                    :class="route.name === 'register' ? 'registerActive' : 'registerNormal'"
                    :handle-click="()=> {router.push({ name: 'register' })}">
                    <UserPlus class="mr-1" />
                    Đăng ký
                </ButtonVue>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .loginActive {
        @apply py-3 px-5 flex gap-3 rounded text-white  items-center  btn-info  border-none;
    }
    .loginNormal {
        @apply py-3 px-5 flex gap-3 rounded text-info items-center btn-info btn-outline hover:border-current hover:bg-transparent hover:text-info;
    }
    .registerActive {
        @apply py-3 px-5 flex gap-3 rounded bg-primary text-white items-center
    }

    .registerNormal {
        @apply py-3 px-5 flex gap-3 rounded text-primary btn-ghost items-center hover:bg-transparent btn-outline hover:text-primary hover:border-current;
    }
</style>
