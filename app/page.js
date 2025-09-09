'use client';

import Header from "@/Components/Header";
// import BlogItem from "@/Components/BlogItem";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (

    <>
    <ToastContainer theme="dark"/>
      <Header/>
      <BlogList/>
      <Footer/>
    </>
  );
}
