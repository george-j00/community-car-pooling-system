import { makeStore } from '@/lib/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    // token: null,
    isLoggedIn : false,
}


export const authSlice = createSlice({
    name: "auth",
    initialState,   
    reducers: { 
        setLogin: (state, action) => {
            console.log('action payload:', action.payload);
            state.user = action.payload.user;
            // state.token = action.payload.token;
            state.isLoggedIn = action.payload.isLoggedIn;
            // setTimeout(() => {
            //     state.isLoggedIn = false;
            //     window.location.href="/login";
            // }, 15*60*60);
        },
        setLogout: (state) => {
            state.user = null;
            // state.token = null;
            state.isLoggedIn = false;
        }, 
        updateProfile: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setLogin, setLogout , updateProfile } = authSlice.actions;
export default authSlice.reducer;