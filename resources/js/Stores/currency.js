import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', () => {
    const currency = ref('PHP')
    const currencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'PHP', symbol: '₱', name: 'Philippine Peso' }
    ]

    const formatter = computed(() => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.value
        })
    })

    function setCurrency(newCurrency) {
        currency.value = newCurrency
    }

    return {
        currency,
        currencies,
        formatter,
        setCurrency
    }
})
