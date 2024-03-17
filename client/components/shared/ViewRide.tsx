import React from 'react'

type rideProps = {
    rideId : string;
}

const ViewRide = ({rideId} : rideProps) => {

    
  return (
    <div>ViewRide {rideId}</div>
  )
}

export default ViewRide