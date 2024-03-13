
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoggedIn : false,
    userLocation: {
        longitude:0,
        latitude:0,
    },
}

export const authSlice = createSlice({
    name: "auth",
    initialState,   
    reducers: { 
        setLogin: (state, action) => {
            console.log('action payload:', action.payload);
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userLocation = action.payload.userLocation;
        },
        setLogout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.userLocation.longitude=0;
            state.userLocation.latitude=0;
        }, 
        updateProfileReducer: (state, action) => {
            state.user = null;
            state.user = action.payload.user
        },
    },
    
});

export const { setLogin, setLogout , updateProfileReducer } = authSlice.actions;
export default authSlice.reducer;