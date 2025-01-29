<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';
import { useCurrencyStore } from '@/Stores/currency';

const props = defineProps({
    monthlyData: Array
});

const currencyStore = useCurrencyStore();
const chartRef = ref(null);

onMounted(() => {
    const ctx = chartRef.value.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: props.monthlyData.map(item => `${item.month}/${item.year}`),
            datasets: [{
                label: 'Monthly Expenses',
                data: props.monthlyData.map(item => item.total),
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: 'rgb(79, 70, 229)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return currencyStore.formatter.format(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return currencyStore.formatter.format(context.raw);
                        }
                    }
                }
            }
        }
    });
});
</script>

<template>
    <AppLayout title="Monthly Report">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Monthly Expense Report
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <canvas ref="chartRef"></canvas>
                </div>

                <!-- Monthly Data Table -->
                <div class="mt-8">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                                    <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Expenses</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="(data, index) in monthlyData" :key="index">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ new Date(data.year, data.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' }) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                        {{ currencyStore.formatter.format(data.total) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
