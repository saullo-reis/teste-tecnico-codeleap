import {configureStore} from '@reduxjs/toolkit'
import userNameReducer from './name'


const store = configureStore({
    reducer: {
        name: userNameReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store