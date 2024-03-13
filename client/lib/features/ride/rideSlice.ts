
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     sourceLocation: "",
//     destinationLocation: "",
//     sourceAddressSuggestions: [],
//     destinationAddressSuggestions:[]
// }


// export const rideSlice = createSlice({
//     name: "ride",
//     initialState,   
//     reducers: { 
//         setSourceLocation: (state, action) => {
//             console.log('action payload:', action.payload);
//             state.sourceLocation = action.payload.location;
//         },
//         setDestinationLocation: (state, action) => {
//             console.log('action payload:', action.payload);
//             state.destinationLocation = action.payload.location;
//         },
//         // setSouceAddressSuggestions: (state, action) => {
//         //     console.log('action payload:', action.payload);
//         //     state.sourceAddressSuggestions = action.payload.sourceAddressSuggestions; 
//         // },
//         // setDestinationAddressSuggestions: (state, action) => {
//         //     console.log('action payload:', action.payload);
//         //     state.destinationAddressSuggestions = action.payload.destinationAddressSuggestions;
//         // },
        
//     },
    
// });

// export const { setSourceLocation, setDestinationLocation } = rideSlice.actions;
// export default rideSlice.reducer;