import Link from 'next/link'
import React from 'react'

const NavigationItems = () => {
  return (
    <div className='flex flex-row gap-5'>
        <Link href={'/'} className="text-white" >Home</Link>
        <Link href={'/profile/view-profile'} className="text-white" >Profile</Link>
    </div>
  )
}

export default NavigationItems