"use client"
import Sidebar from "@/Components/AdminComponent/Sidebar";
import Image from "next/image";
import { assets } from '@/Assets/assets'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function layout({children}){
    return(
        <>
        <div className="flex">
            <ToastContainer position="top-center" autoClose={3000} theme="dark"/>
            <Sidebar/>

            <div className="flex flex-col w-full">

                <div className="flex items-center justify-between w-full py-3 px-12 max-h-[60px] border border-black">
                    <h3 className="font-medium">Admin Panel</h3>
                    <Image src={assets.profile_icon} width={40} alt=""/>
                </div>
                {children}

            </div>
        </div>
        
        </>
    );

}