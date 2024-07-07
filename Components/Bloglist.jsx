"use client"
// import { blog_data } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const Bloglist = () => {
    const [item, setItem] = useState("All")
    const [blog, setBlog] = useState([])

    const fetchData=async()=>{
      const response=await axios.get('/api/blog');
      setBlog(response.data.blog)
      // console.log(response.data.blog)
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
      <div className='flex justify-center gap-6 my-10'>
          <button onClick={()=>setItem("All")}   className={item==="All"?"bg-black text-white px-4 py-1 rounded-sm":""}>All</button>
          <button  className={item==="Technology"?"bg-black text-white px-4 py-1 rounded-sm":""} onClick={()=>setItem("Technology") }>Technology</button>
          <button  className={item==="Startup"?"bg-black text-white px-4 py-1 rounded-sm":""} onClick={()=>setItem("Startup")}>Startup</button>
          <button  className={item==="Lifestyle"?"bg-black text-white px-4 py-1 rounded-sm":""} onClick={()=>setItem("Lifestyle")}>Lifestyle</button>
      </div>
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
         {blog.filter((ite)=>item==="All"?true:ite.category===item).map((item)=>{
             return <BlogItem image={item.image} key={item.key} description={item.description} title={item.title} category={item.category} id={item._id} />
         })}
      </div>
    </div>
  )
}

export default Bloglist
