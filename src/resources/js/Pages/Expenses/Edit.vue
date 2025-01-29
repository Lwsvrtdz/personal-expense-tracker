<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    expense: Object,
    categories: Array
});

// Format the date to YYYY-MM-DD for the date input
const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
};

const form = useForm({
    description: props.expense.description,
    amount: props.expense.amount,
    date: formatDate(props.expense.date),
    category_id: props.expense.category_id,
    notes: props.expense.notes
});

const submit = () => {
    form.put(route('expenses.update', props.expense.id));
};
</script>

<template>
    <AppLayout title="Edit Expense">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Edit Expense
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="p-6">
                        <form @submit.prevent="submit">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Description -->
                                <div>
                                    <label class="block font-medium text-sm text-gray-700" for="description">
                                        Description
                                    </label>
                                    <input v-model="form.description"
                                           type="text"
                                           id="description"
                                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                           required>
                                    <div v-if="form.errors.description" class="text-red-500 text-sm mt-1">
                                        {{ form.errors.description }}
                                    </div>
                                </div>

                                <!-- Amount -->
                                <div>
                                    <label class="block font-medium text-sm text-gray-700" for="amount">
                                        Amount
                                    </label>
                                    <input v-model="form.amount"
                                           type="number"
                                           step="0.01"
                                           id="amount"
                                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                           required>
                                    <div v-if="form.errors.amount" class="text-red-500 text-sm mt-1">
                                        {{ form.errors.amount }}
                                    </div>
                                </div>

                                <!-- Date -->
                                <div>
                                    <label class="block font-medium text-sm text-gray-700" for="date">
                                        Date
                                    </label>
                                    <input v-model="form.date"
                                           type="date"
                                           id="date"
                                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                           required>
                                    <div v-if="form.errors.date" class="text-red-500 text-sm mt-1">
                                        {{ form.errors.date }}
                                    </div>
                                </div>

                                <!-- Category -->
                                <div>
                                    <label class="block font-medium text-sm text-gray-700" for="category">
                                        Category
                                    </label>
                                    <select v-model="form.category_id"
                                            id="category"
                                            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            required>
                                        <option value="">Select a category</option>
                                        <option v-for="category in categories"
                                                :key="category.id"
                                                :value="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                    <div v-if="form.errors.category_id" class="text-red-500 text-sm mt-1">
                                        {{ form.errors.category_id }}
                                    </div>
                                </div>

                                <!-- Notes -->
                                <div class="md:col-span-2">
                                    <label class="block font-medium text-sm text-gray-700" for="notes">
                                        Notes
                                    </label>
                                    <textarea v-model="form.notes"
                                              id="notes"
                                              rows="3"
                                              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                                    <div v-if="form.errors.notes" class="text-red-500 text-sm mt-1">
                                        {{ form.errors.notes }}
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-end mt-6">
                                <button type="submit"
                                        class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        :disabled="form.processing">
                                    Update Expense
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
