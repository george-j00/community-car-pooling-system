// import {
//   setDestinationLocation,
//   setSourceLocation,
// } from "@/lib/features/ride/rideSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// type PropsType = {
//   type: string;
// };

// const ShowSuggestionsBox = ({ type }: PropsType) => {
//   const dispatch = useAppDispatch();

//   const sourceAddressSuggestions = useAppSelector(
//     (state) => state.ride.sourceAddressSuggestions
//   );
//   const destinationAddressSuggestions = useAppSelector(
//     (state) => state.ride.destinationAddressSuggestions
//   );

//   const handleSetLocation = (
//     locationType: "source" | "destination",
//     location: string
//   ) => {
//     const setLocationAction =
//       locationType === "source" ? setSourceLocation : setDestinationLocation;
//     dispatch(setLocationAction({ location: location })); // Pass location as payload
//   };

//   const handleSetAddressSuggestions = (
//     locationType: "source" | "destination",
//     suggestions: string[]
//   ) => {
//     const setAddressSuggestionsAction =
//       locationType === "source"
//         ? setSouceAddressSuggestions
//         : setDestinationAddressSuggestions;
//     dispatch(setAddressSuggestionsAction({ suggestions: suggestions })); // Pass suggestions as payload
//   };


//   console.log(sourceAddressSuggestions);

//   return (
//     <>
//       {/* {sourceAddressSuggestions
//         ? sourceAddressSuggestions.map((item: any, index: number) =>
//             type === "Source" ? (
//               <div
//                 key={index}
//                 className="border p-4 shadow-md hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   handleSetLocation("destination", item.name);
//                   handleSetAddressSuggestions("destination", []);
//                 }}
//               >
//                 {item?.name}
//               </div>
//             ) : null
//           )
//         : null} */}

    
//     </>

//   );
// };

// export default ShowSuggestionsBox;
