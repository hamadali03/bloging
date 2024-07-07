import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Slidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100'>
      <div className='px-2 sm:pl-14 py-3 border border-black'>
      <Link href="/"> <Image src={assets.logo} width={120} alt='' className=' cursor-pointer'/></Link> 
      </div>
      <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
      <div className=' absolute w-[50%] sm:w-[80%] right-0'>
      <Link href="/admin/addProducts" className='flex item-center border  border-black gap-3 font-medium px-3 py-2 bg-white shadow-custom'>
            <Image src={assets.add_icon} width={28} alt=''/><p>Add blog</p>
          </Link>
          <Link href="/admin/addList" className=' mt-5 flex item-center border  border-black gap-3 font-medium px-3 py-2 bg-white shadow-custom'>
            <Image src={assets.blog_icon} width={28} alt=''/><p>Blog List</p>
          </Link>
          <Link href="/admin/subscription" className='mt-5 flex item-center border  border-black gap-3 font-medium px-3 py-2 bg-white shadow-custom'>
            <Image src={assets.email_icon} width={28} alt=''/><p>Subscriptioin</p>
          </Link>
      </div>
          
      </div>
    </div>
  )
}

export default Slidebar
