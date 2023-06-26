import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const add_to_card = createAsyncThunk(
    'card/add_to_card',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/home/product/add-to-card', info)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response.data)
        }
    }
)


export const cardReducer = createSlice({
    name: 'card',
    initialState: {
        card_products : [],
        card_products_count : 0,
        wishlist_count : 0,
        wishlist : [],
        price : 0,
        errorMessage : '',
        successMessage : '',
        shipping_fee : 0,
        outofstock_products : []
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ''
            state.successMessage = ''
        }
    },
    extraReducers: {

    }
})

export const { messageClear } = cardReducer.actions
export default cardReducer.reducer