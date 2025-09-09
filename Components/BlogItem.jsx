import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({ image, category, title, description,id }) => {

  return (
    <>
    <div className='w-full bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]'>
       <Link href={`/blogs/${id}`} className="block">
    {image ? (
      <Image 
        src={`/${image}`}   // ✅ prefix with /uploads/
        alt={title} 
        width={400} 
        height={400} 
        className="border-b border-black object-cover" 
      />
    ) : (
      <Image 
        src="/placeholder.png"     // ✅ fallback if no image
        alt="placeholder" 
        width={400} 
        height={400} 
        className="border-b border-black object-cover" 
      />
    )}
      
 
      <p className='ml-5 mt-5 px-1 inline-block bg-black text-white text-sm'>{category}</p>

      <div className='p-5'>
        <h5 className='mb-2 text-lg font-medium tracking-tighter text-gray-900'>{title}</h5>
        <p className='mb-3 text-sm tracking-tighter text-gray-700'
        
        dangerouslySetInnerHTML={{__html:description.slice(0,120)}}>

        </p>

       {/* <a href="#" className="inline-flex items-center py-2 font-semibold text-center hover:underline">
          Read more 
          <span className="ml-2">
            <Image src={assets.arrow} alt="arrow icon" width={12} height={12} />
          </span>
        </a> */}

      </div>
      </Link>
    </div>
  </>
  )
}

export default BlogItem;
