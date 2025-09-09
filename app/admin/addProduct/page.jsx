"use client"
import React from 'react'
import { assets, blog_data } from '@/Assets/assets';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        title:"",
        description:"",
        category:"",
        author:"Alex Benett",
        authorImage:"/author_img.png"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData({...data,[name]:value});
        console.log("data from add product :" , data)
    }

    const onSubmitHandler = async(event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('image', image);
        formData.append('author', data.author);
        formData.append('authorImage', data.authorImage);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blog`, formData);
        console.log("response from add product = " , res);
try{

    if(res.data.success){
        console.log("response is successful")
            toast.success("blog added");
            setImage(false);
            setData(
                {
                    title:"",
                    description:"",
                    category:"",
                    author:"Alex Benett",
                    authorImage:"/author_img.png"
                }
            )
        }
    else{
        console.log("unsuccessful")
    }

}
catch(e){
    console.error(e);
    toast.error("Something went wrong!");
}

        
        

    }



  return (
    <>
        <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
            <p className="text-xl">Upload Thumbnail</p>
            <label htmlFor="image">
                <Image src={!image? assets.upload_area :URL.createObjectURL(image)} width={140} height={70} alt=''/>
            </label>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" hidden required/>

            <p className="text-xl mt-4">Blog title</p>
            <input name='title' onChange={onChangeHandler} value = {data.title} type="text" className="w-full sm:w-[500px] mt-4 px-4 py-3 border active:border-black"  placeholder='Type Here' required/>

            <p className="text-xl mt-4">Blog Description</p>
            <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" className="w-full sm:w-[500px] mt-4 px-4 py-3 border active:border-black"  placeholder='write content here' required/>

            <p>Blog Category</p>
                <select
                    value={data.category}
                    onChange={onChangeHandler}   // ✅ FIXED
                    name="category"
                    className="w-40 mt-4 px-4 py-3 border text-gray-500 active:border-black"
                    required
                    >
                    <option value="">Select category</option>   {/* ✅ default empty option */}
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
            <br/>
            <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">Add</button>
        </form>
    </>
  )
}

export default page