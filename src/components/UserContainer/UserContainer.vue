<template>
    <div class="navbar-spacing py-4 flex items-start gap-6">
        <div class="flex-1">
            <div class="flex justify-between gap-12">
                <ButtonVue class="flex items-center btn-primary text-white flex-1 rounded-md"
                    :handle-click="() => router.push({ name: 'user-posts' })">
                    <PlusCircle />
                    Bài đăng của tôi
                </ButtonVue>
                <ButtonVue class="flex items-center btn-primary text-white flex-1 rounded-md" :handle-click="toggleModal">
                    <PlusCircle />
                    Cập nhật thông tin
                </ButtonVue>
            </div>
            <div class="personal_info">
                <h2 class="text-2xl mt-6 mb-2 font-bold">Thông tin cá nhân</h2>
                <div class="flex justify-between gap-10">
                    <PersonalInfoBox v-for="data in dataBox" :title="data.title" :content="data.content" :unit="data.unit"
                        :time="userStore.$state.timeUpdatedHealthInfo" :type="data.type" class="flex-1">
                        <template v-slot:icon>
                            <Scale class="icon" />
                        </template>
                    </PersonalInfoBox>
                </div>
            </div>
            <div class="chart">
                <h2 class="text-2xl mt-6 mb-2 font-bold">Biểu đồ</h2>
                <div class="flex justify-between gap-10 mb-10 ">
                    <router-link class="flex-1" :to="{ name: 'user-info', params: { info: 2 } }">
                        <div class="flex-1 rounded-md shadow-md p-8 bg-white">
                            <div class="flex items-center gap-4">
                                <div class=" p-2 bg-primary text-white rounded-lg">
                                    <Scale class="h-8 w-8" />
                                </div>
                                <p class="text-2xl font-medium">Cân nặng</p>
                            </div>
                            <LineChart :type="2" :key="userHealthInfo?.weight" />
                        </div>
                    </router-link>

                    <router-link class="flex-1" :to="{ name: 'user-info', params: { info: 3 } }">
                        <div class="rounded-md shadow-md p-8 bg-white">
                            <div class="flex items-center gap-4">
                                <div class=" p-2 bg-primary text-white rounded-lg">
                                    <BMI class="h-8 w-8" />
                                </div>
                                <p class="text-2xl font-medium">BMI</p>
                            </div>
                            <LineChart :type="3" :key="userHealthInfo?.BMI" />
                        </div>
                    </router-link>

                </div>
                <div class="flex justify-between gap-10">
                    <router-link class="flex-1" :to="{ name: 'user-info', params: { info: 4 } }">
                        <div class="rounded-md shadow-md p-8 bg-white">
                            <div class="flex items-center gap-4">
                                <div class=" p-2 bg-primary text-white rounded-lg">
                                    <Sleep class="h-8 w-8" />
                                </div>
                                <p class="text-2xl font-medium">Thời gian ngủ</p>
                            </div>
                            <BarChart :type="4" :key="userHealthInfo?.sleepTime" />
                        </div>
                    </router-link>


                    <router-link class="flex-1" :to="{ name: 'user-info', params: { info: 5 } }">
                        <div class="rounded-md shadow-md p-8 bg-white">
                            <div class="flex items-center gap-4">
                                <div class=" p-2 bg-primary text-white rounded-lg">
                                    <Flash class="h-8 w-8" />
                                </div>
                                <p class="text-2xl font-medium">Luyện tập</p>
                            </div>
                            <BarChart :type="5" :key="userHealthInfo?.trainingTime" />
                        </div>
                    </router-link>

                </div>
            </div>
        </div>
        <UserInfo />

        <UpdateUserInfo :show-modal="showModal" :handle-toggle="toggleModal" />
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import { changeNameToType } from '@/utils/handle-health';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();

const userStore = useUserStore();
const { userHealthInfo } = storeToRefs(userStore);

const dataBox = computed(() => {
    if (userHealthInfo.value) {
        return [
            {
                title: 'Chiều cao',
                content: userHealthInfo.value.height,
                unit: 'cm',
                type: 'height'
            },
            {
                title: 'Cân nặng',
                content: userHealthInfo.value.weight,
                unit: 'kg',
                type: 'weight'
            },

            {
                title: 'BMI',
                content: userHealthInfo.value.BMI,
                unit: 'kg/m2',
                type: 'BMI'
            },
            {
                title: 'Tập luyện',
                content: userHealthInfo.value.trainingTime,
                unit: 'phút',
                type: 'trainingTime'
            },
        ]
    }
    return
})



const showModal = ref<boolean>(false);
const toggleModal = (): void => {
    showModal.value = !showModal.value;
}

const dataChart = ref([]);
</script>

<style scoped>
.icon {
    @apply h-6 w-6;
}
</style>