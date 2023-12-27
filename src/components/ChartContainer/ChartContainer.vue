<template>
    <div class="navbar-spacing py-4">
        <div class="flex justify-between">
            <ButtonVue class="" :handle-click="() => router.push({ name: 'user' })">Trở lại</ButtonVue>
            <div class="flex gap-4">
                <ButtonVue class="btn-xs rounded-full flex gap-1" :class="{ 'btn-info': displayHealthBy === 'month' }"
                    :handle-click="() => {
                        userStore.changeDisplayHealthBy('month');
                        router.go(0)
                    }">Theo tháng</ButtonVue>
                <ButtonVue class="btn-xs rounded-full flex gap-1" :class="{ 'btn-info': displayHealthBy === 'weak' }"
                    :handle-click="() => {
                        userStore.changeDisplayHealthBy('weak');
                        router.go(0)
                    }">Theo Tuần</ButtonVue>

            </div>
        </div>

        <div class="flex-1 rounded-md shadow-md p-8 bg-white mb-4">
            <div class="flex items-center gap-4">
                <div class=" p-2 bg-primary text-white rounded-lg mb-6">
                    <Scale class="h-8 w-8" />
                </div>
                <p class="text-2xl font-medium">{{ name }}</p>
            </div>
            <LineChart :type="params" :key="forceKey.value" />
        </div>

        <div class="flex gap-4">
            <router-link class="btn btn-xs rounded-full flex gap-1" :class="{ 'btn-info': params === 1 }"
            :to="{ name: 'user-info', params: { info: 1}}"
            >
            Chiều cao
            </router-link>
            <router-link class="btn btn-xs rounded-full flex gap-1" :class="{ 'btn-info': params === 2 }"
            :to="{ name: 'user-info', params: { info: 2}}"
            >
            Cân nặng
            </router-link>
            <router-link 
                class="btn btn-xs rounded-full flex gap-1" 
                :class="{ 'btn-info': params === 5 }"
                :to="{ name: 'user-info', params: { info: 5}}"
            >Thời gian luyện tập</router-link>
            <router-link 
                class="btn btn-xs rounded-full flex gap-1" 
                :class="{ 'btn-info': params === 4 }"
                :to="{ name: 'user-info', params: { info: 4}}"
            >Thời gian ngủ</router-link>
            <router-link 
            class="btn btn-xs rounded-full flex gap-1" 
            :class="{ 'btn-info': params === 3 }"
            :to="{ name: 'user-info', params: { info: 3}}"
            >BMI</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { changeTypeToName } from '@/utils/handle-health';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { displayHealthBy } = storeToRefs(userStore);

const route = useRoute();
const router = useRouter();

const params = computed(() => {
    return Number(route.params.info);
})

const forceKey = computed(() => {
    return params;
})

const name = computed(() => {
    return changeTypeToName(params.value);
})
</script>

<style scoped></style>