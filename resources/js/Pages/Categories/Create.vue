<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const form = useForm({
    name: '',
    color: '#4F46E5' // Default indigo color
});

const submit = () => {
    form.post(route('categories.store'));
};
</script>

<template>
    <AppLayout title="Add Category">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Add New Category
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="p-6">
                        <form @submit.prevent="submit">
                            <div class="grid grid-cols-1 gap-6">
                                <!-- Name -->
                                <div>
                                    <label class="block font-medium text-sm text-gray-700" for="name">
                                        Name
                                    </label>
                                    <input v-model="form.name"
                                           type="text"
                                           id="name"
                                           class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                           required>
                                    <div v-if="form.errors.name" class="text-red-500 text-sm mt-1">
                                        {{ form.errors.name }}
                                    </div>
                                </div>

                                <!-- Color -->
                                <div>
                                    <label class="block font-medium text-sm text-gray-700" for="color">
                                        Color
                                    </label>
                                    <div class="mt-1 flex items-center space-x-3">
                                        <input v-model="form.color"
                                               type="color"
                                               id="color"
                                               class="h-10 w-20 p-1 rounded border border-gray-300">
                                        <span class="text-sm text-gray-600">
                                            Choose a color for the category
                                        </span>
                                    </div>
                                    <div v-if="form.errors.color" class="text-red-500 text-sm mt-1">
                                        {{ form.errors.color }}
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-end mt-6">
                                <button type="submit"
                                        class="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        :disabled="form.processing">
                                    Save Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
