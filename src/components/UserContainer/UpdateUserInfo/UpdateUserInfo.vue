<template>
    <dialog class="modal" :class="{ 'modal-open': showModal }">
        <div class="modal-box max-w-max">
            <form action="POST" @submit="(e: Event) => {
                handleSubmit(e);
            }">
                <h2>Cập nhật thông tin của bạn</h2>
                <div class="form-control">
                    <div class="box">
                        <Height class="w-20" />
                    </div>
                    <label for="height">
                        Chiều cao:
                    </label>
                    
                    <div class="input-box" :class="{error: height === undefined}">
                        <input type="number" name="height" id="height" v-model="height" step="0.01">
                        <span class="metric">cm</span>
                    </div>
                </div>
                <div class="form-control">
                    <div class="box">
                        <Scale class="w-20" />
                    </div>
                    <label for="weight">
                        Cân nặng:
                    </label>
                    <div class="input-box" :class="{error: weight === undefined}">
                        <input type="number" name="weight" id="weight" v-model="weight" step="0.01">
                        <span class="metric">kg</span>
                    </div>
                </div>
                <div class="form-control">
                    <div class="box">
                        <Sleep class="w-20" />
                    </div>
                    <label for="sleepTime">
                        Giờ ngủ:
                    </label>
                    <div class="input-box" :class="{error: sleepTime === undefined}">
                        <input type="number" name="sleepTime" id="sleepTime" v-model="sleepTime" step="0.25">
                        <span class="metric">giờ</span>
                    </div>
                </div>
                <div class="form-control">
                    <div class="box">
                        <Flash class="w-20" />
                    </div>
                    <label for="trainingTime">
                        Thời gian tập luyện:
                    </label>
                    <div class="input-box" :class="{error: trainingTime === undefined}">
                        <input type="number" id="trainingTime" name="trainingTime" v-model="trainingTime">
                        <span class="metric">phut</span>
                    </div>
                </div>
                <div class="flex gap-3 justify-center col-start-1 col-span-2 mt-4">
                    <ButtonVue class="btn btn-md" :handleClick="handleToggle">Close</ButtonVue>
                    <ButtonVue class="btn btn-primary text-white btn-md" type="submit">
                        Xác nhận
                    </ButtonVue>
                </div>
            </form>
        </div>
    </dialog>
</template>
  
<script setup lang="ts">
import { useUserStore, useAlertStore } from "@/stores";
import type { UpdatedHealthInfo } from "@/types";

const alertStore = useAlertStore();
const userStore = useUserStore();
const { updateHealthInfo } = userStore;
const height = ref<number>();
const weight = ref<number>();
const sleepTime = ref<number>();
const trainingTime = ref<number>();

const props = defineProps<{
    handleToggle: any;
    showModal: boolean;
}>();


let handleSubmit = async (e: Event) => {
    e.preventDefault();

    if(height.value === undefined || weight.value === undefined || sleepTime.value === undefined || trainingTime.value === undefined) {
        alertStore.error('Ban chua dien mot so gia tri');
        return ;
    }
    const data: UpdatedHealthInfo = {
        height: height.value,
        weight: weight.value,
        sleepTime: sleepTime.value,
        trainingTime: trainingTime.value
    }

    updateHealthInfo(data);

    props.handleToggle();
};
</script>

<style scoped>
form {
    grid-template-rows: auto repeat(2, 1fr);
    grid-template-columns: repeat(2, max-content);
    @apply grid gap-x-6 gap-y-6;
}

h2 {
    @apply col-start-1 col-span-2 row-start-1 row-span-1 text-center text-3xl font-bold pt-4 pb-8 bg-clip-text bg-gradient-to-r from-primary to-secondary text-transparent;
}

.form-control {
    grid-template-columns: auto 1fr;
    @apply grid grid-rows-2 gap-x-4 gap-6 items-center shadow-md drop-shadow-md shadow-orange-800 p-2 rounded-md;
}

.form-control .box {
    @apply col-span-1 col-start-1 row-start-1 row-span-2 h-32 w-32 bg-primary/40 rounded-lg flex justify-center items-center;
}

.form-control label {
    @apply text-2xl font-semibold;
}

.form-control .input-box {
    @apply bg-primary/40 rounded-md text-black flex justify-center items-center font-semibold;
}

.form-control .input-box.error {
    @apply border-error border;
}

.input-box input {
    @apply input input-ghost w-full max-w-xs text-right flex-1 pl-0 pr-0;
    @apply hover:bg-transparent hover:border-none focus:outline-none;
    @apply focus:bg-transparent focus:border-none focus:outline-none;
}




.input-box .metric {
    @apply flex-1
}
</style>
