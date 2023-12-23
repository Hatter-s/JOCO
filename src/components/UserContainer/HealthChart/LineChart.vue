<template>
    <Line :data="data" :options="options" />
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#F48023',
            borderColor: '#F48023',
            data: [40, 39, 10, 40, 39, 80, 40],
        }
    ]
}
const options = {
    responsive: true,

}
</script>
  