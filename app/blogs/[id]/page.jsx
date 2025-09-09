'use client';
import { assets, blog_data } from '@/Assets/assets';
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Footer from '@/Components/Footer';
import Link from 'next/link';
import axios from 'axios';
import {useParams} from "next/navigation";

const page = ({params}) => {
    const [data, setData] = useState(null);
    const {id} = useParams()

    const fetchBlogData = async ()=> {
        //we will send _id to backend
        //and based on it, backend will find the blog
        //and fetch it 
        console.log("fetching blog data")
        const response = await axios.get('/api/blog', {
            params:{
                id:id
            }
        })

//         Axios doesn’t return a Response object like fetch() does, so it has no .json() method.

// Instead, Axios automatically parses JSON and gives you the data in response.data.
        console.log("response of blog ", response.data)
        setData(response.data);
    }

    useEffect(()=> {
        fetchBlogData();
    }, [])

  return (
    data ? <>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
       <div className='flex justify-between items-center'>
        <Link href='/'>
        <Image src={assets.logo} width={180} alt='arrow' className='w-[130px] sm:w-auto' />
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
            Get started <Image src={assets.arrow} alt='arrow'/>
        </button>
       </div>
       <div className='text-center my-24'>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
            <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt=''/>
            <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
       </div>
    </div>

    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image className='border-6 border-white' src={`/${data.image}`} width={1280} height={720}/>
        
        <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}>

        </div>
        

        <div className='my-24'>
            <p className='text-black font font-semibold my-4'>Share this article with friends and family</p>
            <div className='flex'>
                <Image src={assets.facebook_icon} width={50} alt=''/>
                <Image src={assets.twitter_icon} width={50} alt=''/>
                <Image src={assets.googleplus_icon} width={50} alt=''/>
            </div>
        </div>

    </div>
<Footer/>
    </> : 
    <></>
  );
}

export default page;