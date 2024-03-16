
const ShowDistanceTime = ({directions} : any) => {


  const distance = directions?.length > 0 ? directions[0]?.distance / 1000 : 0
  const duration = directions?.length > 0 ? directions[0]?.duration / 3600  : 0
    
    
  return (
    <div className='flex gap-10 justify-center md:justify-start'>
       <h1 className='bg-yellow-500 p-4 text-black font-extrabold '>Distance : {distance?.toFixed(2)} Km</h1>
       <h1 className='bg-yellow-500 p-4 text-black font-extrabold '>Duration : {duration?.toFixed(2)} Hr</h1>
    </div>
  )
}

export default ShowDistanceTime