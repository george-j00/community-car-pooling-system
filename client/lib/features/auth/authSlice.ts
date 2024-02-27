import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,   
    reducers: { 
        setLogin: (state, action) => {
            console.log('action payload:', action.payload);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        }, 
        updateProfile: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setLogin, setLogout , updateProfile } = authSlice.actions;
export default authSlice.reducer;