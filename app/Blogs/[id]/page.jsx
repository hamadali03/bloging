"use client"
import { assets } from '@/Assets/assets'
import Footer from '@/Components/Footer'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import axios from 'axios'

const Page = ({ params }) => {
    const [data, setData] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: params.id
                }
            })
            // console.log('API response:', response.data)
            setData(response.data.blog)  // Adjusted to set data correctly
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getFormattedPath = (path) => {
        if (typeof path !== 'string') return '';
        return path.startsWith('http') ? path : `/${path}`;
    };

    if (!data) {
        return <p>Loading...</p>
    }

    
    const authorImage = data.authorImage !== "null" ? getFormattedPath(data.authorImage) : assets.defaultAuthorImage;
    const imagePath = getFormattedPath(data.image);

    // console.log('Formatted authorImage path:', authorImage); // Add logging
    // console.log('Formatted image path:', imagePath); // Add logging

    return (
        <>
            <div className='bg-gray-200 px-5 py-5 md:px-12 lg:px-28'>
                <div className='flex justify-between items-center'>
                    <Link href='/'>
                        <Image src={assets.logo} alt='Logo' width={180} height={50} className='w-[130px] sm:w-auto' />
                    </Link>
                    <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-custom'>
                        Get Started
                        <Image src={assets.arrow} alt='Arrow' width={12} height={12} />
                    </button>
                </div>
                <div className='my-24 text-center'>
                    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                    <Image className='mx-auto border border-white rounded-full mt-6' src={assets.profile_icon} width={40} height={40} alt={data.author} />
                    <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                </div>
            </div>
            <div className='mx-5 md:mx-auto max-w-[800px] mt-[-100px] mb-10'>
                <Image src={imagePath} width={1280} height={720} alt={data.title} className='border-4 border-white' />
              
                <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}></div>

                <div className='my-24'>
                    <p className='text-black font-semibold my-4'>Share This article on social media</p>
                    <div className='flex'>
                        <Image src={assets.facebook_icon} width={50} height={50} alt='Facebook Icon' />
                        <Image src={assets.twitter_icon} width={50} height={50} alt='Twitter Icon' />
                        <Image src={assets.googleplus_icon} width={50} height={50} alt='Google Plus Icon' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page
