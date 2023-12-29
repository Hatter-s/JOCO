<template>
    <div class="flex justify-between items-center bg-white">
        <div class="flex-1 flex justify-center">
            <form 
                action="" 
                class="max-w-[500px] w-full"
                @submit="(e:Event) => handleSubmit(e)"
            >
                <h1 class="text-4xl mb-8 font-bold">We miss you!</h1>
                <div class="form-control">
                    <label for="user_name">
                        Tên đăng nhập
                    </label>
                    <input type="text" name="user_name" id="user_name" placeholder="ex: JohnDoe" v-model="username" :class="{error: error}">
                </div>

                <div class="form-control">
                    <label for="password">
                        Mật khẩu
                    </label>
                    <div class="relative">
                        <input :type="viewPassword ? 'text' : 'password'" name="password" id="password" v-model="password" :class="{error: error}">
                        <ButtonVue
                            class="btn btn-ghost btn-xs absolute top-1/2 -translate-y-1/2 right-0 hover:bg-transparent"
                            :handle-click="toggleViewPassword">

                            <Eye v-if="!viewPassword" />
                            <CloseEye v-if="viewPassword" />
                        </ButtonVue>
                    </div>

                </div>
                <div class="mt-12">
                    <input type="submit" name="submit_login" id="submit_login" value="Đăng nhập"
                        class="ntn btn-primary w-full rounded-md text-white btn-md text-lg">
                </div>
            </form>
        </div>

        <img :src="accountAuthImg" alt="login_front_img" class="flex-1 aspect-square max-w-[750px]">
    </div>
</template>

<script setup lang="ts">
import accountAuthImg from "@/assets/image/account-auth.png";
import { useAuthStore } from "@/stores";
import { storeToRefs } from "pinia";

const username = ref<string>('');
const password = ref<string>('');
const viewPassword = ref<boolean>(false);

const authStore = useAuthStore();
const login = authStore.login;
const { error } = storeToRefs(authStore);

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    await login(username.value, password.value);
}

const toggleViewPassword = () => {
    viewPassword.value = !viewPassword.value;
}

</script>

<style scoped>
.form-control {
    @apply gap-2 mb-6;
}

.form-control label {
    @apply text-xl font-semibold flex justify-between items-end;
}

.form-control label span.error {
    @apply text-sm text-error;
}

.form-control input:not([type=submit]) {
    @apply input input-secondary rounded-md input-md w-full hover:input-primary focus:input-primary;
}

.form-control input:not([type=submit]).error {
    @apply input-error
}
</style>