import ViewRide from '@/components/shared/ViewRide'
import React from 'react'

type RideParams =  {
    params : {
        id : string
    }
}

const page = ({params : { id }} : RideParams) => {
  return (
    <div className='wrapper '>
        <ViewRide rideId = {id}/>
    </div>
  )
}

export default page