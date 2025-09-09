import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-5 sm:gap-1 sm:flex-row bg-black py-5 items-center'>
        <Image src={assets.logo_light} alt='footer' width={120}/>
        <p className='text-sm text-white'>All rights reserved. Copyright@blogger</p>
        <div className='flex'>
            <Image src={assets.facebook_icon} alt='facebook' width={40} className='mx-2 cursor-pointer' />
            <Image src={assets.googleplus_icon} alt='google plus' width={40} className='mx-2 cursor-pointer' />  
            <Image src={assets.twitter_icon} alt='twitter' width={40} className='mx-2 cursor-pointer' />
        </div>
    </div>
  )
}

export default Footer