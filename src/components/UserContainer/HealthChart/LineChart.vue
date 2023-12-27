<template>
    <Line :data="chartLineData" :options="options" />
</template>
  
<script lang="ts" setup>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useUserStore, useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

onMounted(() => {
    if (user.value) {
        userStore.getHealthInfo(user.value.id);

        if (userStore.$state.displayHealthBy === 'weak') {
            const response = userStore.getHealthInfoByWeak(user.value.id, props.type).then(res => {
                data.value = res?.data
                labels.value = res?.labels
                console.log(labels.value);

            });
        }
        if (userStore.$state.displayHealthBy === 'month') {
            const response = userStore.getHealthInfoByMonth(user.value.id, props.type).then(res => {
                data.value = res?.data
                labels.value = res?.labels
                console.log(labels.value);

            });
        }
    }
})

const props = defineProps<{
    type: number
}>()


const data = ref();
const labels = ref()


const chartLineData = computed(() => ({
    labels: labels.value,
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#FAD1B0',
            borderColor: '#F48023',
            data: data.value,
            fill: false,
            radius: 10,
            pointHoverRadius: 12,
            pointHoverBackgroundColor: '#F48023'
        }
    ]
}))
const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false // This hides all text in the legend and also the labels.
        }
    }
}
</script>
  