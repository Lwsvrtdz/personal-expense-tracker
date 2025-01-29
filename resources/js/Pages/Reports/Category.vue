<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';
import { useCurrencyStore } from '@/Stores/currency';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
    categoryData: Array
});

const currencyStore = useCurrencyStore();
const chartRef = ref(null);

const formatter = currencyStore.formatter;

const chartData = ref({
    labels: props.categoryData.map(item => item.category.name),
    datasets: [{
        data: props.categoryData.map(item => item.total),
        backgroundColor: props.categoryData.map(item => item.category.color),
    }]
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right'
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((context.raw / total) * 100).toFixed(1);
                    return `${context.label}: ${formatter.format(context.raw)} (${percentage}%)`;
                }
            }
        }
    }
});
</script>

<template>
    <AppLayout title="Category Report">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Category Expense Report
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <!-- Chart -->
                    <div class="h-96">
                        <Doughnut :data="chartData" :options="chartOptions" />
                    </div>

                    <!-- Data Table -->
                    <div class="mt-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Expenses</th>
                                        <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="data in categoryData" :key="data.category_id">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div class="flex items-center">
                                                <span class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: data.category.color }"></span>
                                                {{ data.category.name }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                            {{ formatter.format(data.total) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                            {{ ((data.total / categoryData.reduce((sum, cat) => sum + cat.total, 0)) * 100).toFixed(1) }}%
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Total</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                                            {{ formatter.format(categoryData.reduce((sum, cat) => sum + cat.total, 0)) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">100%</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
