<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import { useCurrencyStore } from '@/Stores/currency';

defineProps({
    categories: Array
});

const currencyStore = useCurrencyStore();
</script>

<template>
    <AppLayout title="Categories">
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Categories
                </h2>
                <Link :href="route('categories.create')" 
                      class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                    Add New Category
                </Link>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div v-for="category in categories" 
                                 :key="category.id"
                                 class="bg-white rounded-lg shadow p-6"
                                 :style="{ borderLeft: `4px solid ${category.color}` }">
                                <div class="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 class="text-lg font-semibold text-gray-900">
                                            {{ category.name }}
                                        </h3>
                                        <p class="text-sm text-gray-600 mt-1">
                                            {{ category.expenses_count }} expenses
                                        </p>
                                    </div>
                                    <div class="flex space-x-2">
                                        <Link :href="route('categories.edit', category.id)"
                                              class="text-indigo-600 hover:text-indigo-900">
                                            Edit
                                        </Link>
                                        <Link :href="route('categories.destroy', category.id)"
                                              method="delete"
                                              as="button"
                                              class="text-red-600 hover:text-red-900"
                                              @click="confirm('Are you sure you want to delete this category?')">
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <p class="text-2xl font-bold text-gray-900">
                                        {{ currencyStore.formatter.format(category.expenses_sum_amount || 0) }}
                                    </p>
                                    <p class="text-sm text-gray-600">Total expenses</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
