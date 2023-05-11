import {createSlice} from '@reduxjs/toolkit'

const name = createSlice({
    name: 'name',
    initialState: {
        name: 'none'
    },
    reducers: {
        addName(state, action){
            state.name = action.payload
        }
    }
})

export const {addName} = name.actions
export default name.reducer