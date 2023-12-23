<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartBarData"
    />
  </template>
  
  <script setup lang="ts">
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  const chartBarData = {
      labels: [ 'January', 'February', 'March' ],
      datasets: [ { data: [40, 20, 12],  backgroundColor: '#F48023' } ]
  }
  
  const chartOptions = {
      responsive: true
  }
  
  </script>
  
  <style scoped>
  
  </style>