"use client"
import { assets } from "@/Assets/assets"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify"

const Header = () => {
  const [email, setEmail] = useState("")

  const onsubmitHandelr=async(e)=>{
    e.preventDefault()
    const formData=new FormData() 
    formData.append("email",email);
    const response=await axios.post('/api/email',formData)
    if(response.data.success){
      toast.success(response.data.msg)
      setEmail("")
    }else{
      toast.error("error")
    }
  }
  return (
    <div className="px-5 py-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={180} alt="" className="w-[130px] sm:w-auto cursor-pointer"/>
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-custom">Get started<Image src={assets.arrow} alt="" /></button>
      </div>
      <div className="text-center my-8 ">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blog</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis corrupti ut possimus iure ducimus aperiam nisi</p>
        <form onSubmit={onsubmitHandelr} action="" className="flex justify-between max-w-[500px] m-auto mt-10 scale-75 sm:scale-100 border border-black shadow-custom">
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter your Email.." className="pl-4 outline-none"/>
          <button type="submit" className="border-l border-black py-4 px-4 sm:px-8 active:text-white active:bg-gray-600">Subscribe</button>
        </form>
      </div>
    </div>
  )
}   
 
export default Header; 
