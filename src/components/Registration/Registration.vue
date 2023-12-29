<template>
    <div class="flex justify-between items-center bg-white">
        <div class="flex-1 flex justify-center">
            <form action="" class="max-w-[500px] w-full" @submit="(e: Event) => { handleSubmit(e) }">
                <h1 class="text-4xl mb-8 font-bold">We miss you!</h1>
                <div class="form-control">
                    <label for="user_name">
                        Tên đăng nhập
                        <span v-if="error?.username" class="error">
                            {{ error?.username?.message }}
                        </span>
                    </label>
                    <input type="text" name="user_name" id="user_name" placeholder="ex: JohnDoe" v-model="username">
                </div>

                <div class="form-control">
                    <label for="email">
                        Email
                        <span v-if="error?.email" class="error">
                            {{ error?.email?.message }}
                        </span>
                    </label>
                    <input type="email" name="email" id="email" placeholder="ex: JohnDoe@gmail.com" v-model="email">
                </div>


                <div class="form-control">
                    <label for="password">
                        Mật khẩu
                        <span v-if="error?.password" class="error">
                            {{ error?.password?.message }}
                        </span>
                    </label>
                    <div class="relative">
                        <input :type="viewPassword ? 'text' : 'password'" name="password" id="password" v-model="password">
                        <ButtonVue
                            class="btn btn-ghost btn-xs absolute top-1/2 -translate-y-1/2 right-0 hover:bg-transparent"
                            :handle-click="toggleViewPassword">
                            <Eye />
                        </ButtonVue>
                    </div>

                </div>

                <div class="form-control">
                    <label for="re-password">
                        Nhập lại mật khẩu
                        <span v-if="error?.passwordConfirm === 're-password'" class="error">
                            {{ error?.passwordConfirm.message }}
                        </span>
                    </label>
                    <div class="relative">
                        <input :type="viewPassword ? 'text' : 'password'" name="re_password" id="re_password"
                            v-model="repeatPassword">
                        <ButtonVue
                            class="btn btn-ghost btn-xs absolute top-1/2 -translate-y-1/2 right-0 hover:bg-transparent"
                            :handle-click="toggleViewPassword">
                            <Eye />
                        </ButtonVue>
                    </div>

                </div>
                <div class="mt-12">
                    <input type="submit" name="submit_register" id="submit_register" value="Đăng ký"
                        class="ntn btn-primary w-full rounded-md text-white btn-md text-lg">
                </div>
            </form>
        </div>

        <img :src="accountAuthImg" alt="login_front_img" class="flex-1 aspect-square max-w-[750px]">
    </div>
</template>

<script setup lang="ts">
import accountAuthImg from "@/assets/image/account-auth.png";
import { useUserStore } from "@/stores";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { error } = storeToRefs(userStore);

const username = ref<string>('');
const password = ref<string>('');
const email = ref<string>('');
const repeatPassword = ref<string>('');

const handleSubmit = (e: Event) => {
    e.preventDefault();

    userStore.register(
        {
            username: username.value,
            password: password.value,
            repeatPassword: repeatPassword.value,
            email: email.value,
        }
    )

}
const viewPassword = ref<boolean>(false);
const toggleViewPassword = () => {
    viewPassword.value = !viewPassword.value
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