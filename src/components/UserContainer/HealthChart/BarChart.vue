<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartBarData" />
</template>
  
<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useUserStore, useAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

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

const chartBarData = computed(() => ({
  labels: labels.value,
  datasets: [{
    data: data.value,
    backgroundColor: '#FAD1B0',
    hoverBackgroundColor: '#F48023'
  }]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false // This hides all text in the legend and also the labels.
    }
  }
}

</script>
  
<style scoped></style>