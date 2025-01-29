<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref } from 'vue';
import { useCurrencyStore } from '@/Stores/currency';

const props = defineProps({
    totalExpenses: Number,
    monthlyExpenses: Number,
    recentExpenses: Array,
    categoryTotals: Array
});

const currencyStore = useCurrencyStore();
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Expenses</h3>
                        <p class="text-3xl font-bold text-indigo-600">{{ currencyStore.formatter.format(totalExpenses) }}</p>
                    </div>
                    <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">Monthly Expenses</h3>
                        <p class="text-3xl font-bold text-indigo-600">{{ currencyStore.formatter.format(monthlyExpenses) }}</p>
                    </div>
                </div>

                <!-- Recent Transactions -->
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6 mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="expense in recentExpenses" :key="expense.id">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ new Date(expense.date).toLocaleDateString() }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ expense.description }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span class="inline-flex items-center">
                                            <span class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: expense.category.color }"></span>
                                            {{ expense.category.name }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <span class="inline-flex items-center">
                                            {{ expense.user.name }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{{ currencyStore.formatter.format(expense.amount) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Category Summary -->
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Category Summary</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div v-for="category in categoryTotals" 
                             :key="category.category.id"
                             class="p-4 rounded-lg"
                             :style="{ backgroundColor: category.category.color + '10' }">
                            <h4 class="font-medium text-gray-900">{{ category.category.name }}</h4>
                            <p class="text-2xl font-semibold mt-2" :style="{ color: category.category.color }">{{ currencyStore.formatter.format(category.total) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
