"use client"
import BlogTableItem from '@/Components/AdminComponent/BlogTableItem'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const page = () => {

    const [blogs,setBlogs] = useState([]);

    const fetchBlogs = async() => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);

        console.log("blog data ->", res);

        setBlogs(res.data.blogs);
    }

    //this function is to be passed in the blogtableitem component
    const deleteBlog = async (mongoId) => {
  if (mongoId != null) {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
        params: { id: mongoId }
      });
      console.log("blog deleted successfully");
      alert("deleted!");
      toast.success(res.data.message);
      fetchBlogs();
    } 
    
    catch (e) {
      console.log("error occured while deleting", e);
      alert("error occured: ", e)
      toast.error(e.response?.data?.message || "Error deleting blog");
    }
  }
};


    useEffect(()=> {
        fetchBlogs();
    }, []);

  return (
  <>

    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
        <h1>All Blogs</h1>
        <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">

            <table className="w-full text-sm text-gray-500">

                <thead className="text-sm text-gray-700 text-left uppercase">
                    <tr>
                        <th scope='col' className=" px-6 py-3">
                            Author Name
                        </th>

                        <th scope='col' className=" px-6 py-3">
                            Blog Title
                        </th>

                        <th scope='col' className="px-6 py-3">
                            Date
                        </th>

                        <th scope='col' className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {blogs.map((item , index)=> {
                        return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg = {item.authorImg} date={item.date} deleteBlog={deleteBlog}/>
                    })}
                     
                </tbody>

            </table>
        </div>
    </div>
      </>
  )
}

export default page