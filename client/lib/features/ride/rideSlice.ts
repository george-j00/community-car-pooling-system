
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
    directions:[],
    allRides : [],
    completeRideData : {}
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
        setAllRidesAvail: (state, action) => {
            console.log('ride data action payload ' , action.payload);
            state.allRides = action.payload;
        },
        setCompleteRideData: (state, action) => {
            console.log('complete ride dataaaa action payload ' , action.payload);
            state.completeRideData = action.payload;
        }
    },
});

export const { setSourceLocationCoordinator, setDestinationLocationCoordinator,setDirections,setAllRidesAvail , setCompleteRideData} = rideSlice.actions;
export default rideSlice.reducer;