import { createSlice } from '@reduxjs/toolkit'

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        global: {},
    },
    reducers: {
        errorGlobal: (state, action)=>{
            state.global.error = true;
            state.global.message = action.payload;
        },
        successGlobal: (state, action)=>{
            state.global.success = true;
            state.global.message = action.payload;
        },
        infoGlobal: (state, action)=>{
            state.global.info = true;
            state.global.message = action.payload;
        },
        clearNotifications: (state)=>{
            state.global = {}
        }
    }
});

export const { errorGlobal, successGlobal, infoGlobal, clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;