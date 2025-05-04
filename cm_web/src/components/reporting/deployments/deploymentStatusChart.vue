<script setup lang="ts">
const props = defineProps({
  errors: Number,
  inprogress: Number,
  success: Number,
  other: Number,
  unknown: Number
})
import { ref, onMounted, watch  } from 'vue';
import Chart from 'primevue/chart';

onMounted(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    chartData.value = {
        labels: ['Count'],
        datasets: [
            {
                type: 'bar',
                label: 'Errors',
                data: [props.errors],
                backgroundColor: [documentStyle.getPropertyValue('--p-red-500')],
            },
            {
                type: 'bar',
                label: 'In Progress',
                data: [ props.inprogress],
                backgroundColor: [ documentStyle.getPropertyValue('--p-orange-500')],
            },
            {
                type: 'bar',
                label: 'Other',
                data: [ props.other],
                backgroundColor: [ documentStyle.getPropertyValue('--p-teal-500'), ],
            },
            {
                type: 'bar',
                label: 'Success',
                data: [ props.success],
                backgroundColor: [documentStyle.getPropertyValue('--p-green-500')],
            },
            {
                type: 'bar',
                label: 'Unknown',
                data: [ props.unknown],
                backgroundColor: [documentStyle.getPropertyValue('--p-gray-500')],
            }
        ]
    }

    chartOptions.value = {
        indexAxis: 'y',
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                display: false,
                
            }
        },
        scales: {
            x: {
                stacked: true,
                display: false,
                
            },
            y: {
                stacked: true,
                display: false,
            }
        }
    }
})

const chartData = ref();
const chartOptions = ref();
</script>


<template>
    <Chart type="bar" :data="chartData" :options="chartOptions" />
</template>