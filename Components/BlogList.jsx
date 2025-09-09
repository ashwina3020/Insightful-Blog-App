"use client"
import React, { useEffect } from 'react'
// import { blog_data } from '@/Assets/assets'
import BlogItem from './BlogItem'
import { useState } from 'react'
import axios from 'axios'


const BlogList = () => {
  const[menu, setMenu] = useState("All");
  //state variable to store api data
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async ()=> {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  }

  useEffect( ()=> {
    fetchBlogs();
  }, []);

  return (
      
    <div>
        <div className='flex justify-center gap-6 my-10'>
          <button onClick={()=>setMenu("All")} className={menu==="All"?'bg-black text-white py-1 px-4 rounded-sm':''} >All</button>
          <button onClick={()=>setMenu("Technology")} className={menu==="Technology"?'bg-black text-white py-1 px-4 rounded-sm':''}>Technology</button>
          <button onClick={()=>setMenu("Startup")} className={menu==="Startup"?'bg-black text-white py-1 px-4 rounded-sm':''}>Startup</button>

          <button onClick={()=>setMenu("Lifestyle")} className={menu==="Lifestyle"?'bg-black text-white py-1 px-4 rounded-sm':''}>Lifestyle</button>
        </div>
        <div className='grid gap-6 mb-16 xl:mx-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            {blogs.filter((item)=> menu==="All"?true:item.category===menu).map((item, index)=>{
              return <BlogItem key={index} id={item._id} image={item.image} title={item.title} category={item.category} description={item.description} />
            })}
          </div>
    </div>
  )
}

export default BlogList