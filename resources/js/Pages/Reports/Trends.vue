<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, computed, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useCurrencyStore } from '@/Stores/currency';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const props = defineProps({
    trends: Object
});

const currencyStore = useCurrencyStore();

const formatter = currencyStore.formatter;

// Get unique months from all categories
const months = Array.from(new Set(
    Object.values(props.trends)
        .flatMap(items => items.map(item => `${item.year}-${String(item.month).padStart(2, '0')}`))
)).sort();

const chartData = ref({
    labels: months,
    datasets: Object.entries(props.trends).map(([categoryId, data]) => {
        const category = data[0].category;
        return {
            label: category.name,
            data: months.map(month => {
                const monthData = data.find(d => `${d.year}-${String(d.month).padStart(2, '0')}` === month);
                return monthData ? monthData.total : 0;
            }),
            borderColor: category.color,
            backgroundColor: category.color,
            tension: 0.1
        };
    })
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return formatter.format(value);
                }
            }
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context) {
                    return `${context.dataset.label}: ${formatter.format(context.raw)}`;
                }
            }
        }
    }
});

const getMonthTotal = (month) => {
    return Object.values(props.trends)
        .reduce((sum, categoryData) => {
            const monthData = categoryData.find(d => `${d.year}-${String(d.month).padStart(2, '0')}` === month);
            return sum + (monthData ? parseFloat(monthData.total) : 0);
        }, 0);
};
</script>

<template>
    <AppLayout title="Expense Trends">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Expense Trends
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <!-- Chart -->
                    <div class="h-96">
                        <Line :data="chartData" :options="chartOptions" />
                    </div>

                    <!-- Data Table -->
                    <div class="mt-8 overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                                    <th v-for="(data, categoryId) in trends" :key="categoryId"
                                        class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {{ data[0].category.name }}
                                    </th>
                                    <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="month in months" :key="month">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' }) }}
                                    </td>
                                    <td v-for="(data, categoryId) in trends" :key="categoryId"
                                        class="px-6 py-4 whitespace-nowrap text-sm text-right"
                                        :style="{ color: data[0].category.color }">
                                        {{ formatter.format(data.find(d => `${d.year}-${String(d.month).padStart(2, '0')}` === month)?.total || 0) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                                        {{ formatter.format(getMonthTotal(month)) }}
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
