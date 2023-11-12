import { create } from 'zustand'
import { mockData } from '../API/api'
import { CurrencyStore } from '../types/types'

export const useCurrencyStore = create<CurrencyStore>((set) => ({
    currencyData: [...mockData],
    updateCurrency: (index, field, value) => {
        set((state) => {
            const newData = [...state.currencyData]
            newData[index][field] = value
            return { currencyData: newData }
        })
    },
}))
