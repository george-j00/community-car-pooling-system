
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sourceLocationCoordinator: {
        latitude:0,
        longitude:0
    },
    destinationLocationCoordinator: {
        latitude:0,
        longitude:0
    },
    directions:[]
}


export const rideSlice = createSlice({
    name: "ride",
    initialState,   
    reducers: { 
        setSourceLocationCoordinator: (state, action) => {
            console.log('action payload:', action.payload);
            state.sourceLocationCoordinator.latitude = action.payload[1];
            state.sourceLocationCoordinator.longitude = action.payload[0];
        },
        setDestinationLocationCoordinator: (state, action) => {
            console.log('action payload:', action.payload);
            state.destinationLocationCoordinator.latitude = action.payload[1];
            state.destinationLocationCoordinator.longitude = action.payload[0];
        },
        setDirections: (state, action) => {
            console.log('direction action payload:', action.payload);
            state.directions = action.payload;
        },
    },
});

export const { setSourceLocationCoordinator, setDestinationLocationCoordinator,setDirections} = rideSlice.actions;
export default rideSlice.reducer;