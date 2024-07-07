"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("author", data.author);
      formData.append("authorImg", data.authorImg);
      formData.append("image", image);

      // Debug log to check formData content
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }

      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg); // Show the success message from the response
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennett",
          authorImg: "/author_img.png",
        });
        setImage(null); // Clear the image state
      } else {
        toast.error(response.data.msg || "Error occurred");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <p className="text-xl">Upload Thumbnail</p>
      <label htmlFor="image">
        <Image
          src={!image ? assets.upload_area : URL.createObjectURL(image)}
          width={140}
          height={70}
          alt=""
          className="mt-4"
        />
      </label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        id="image"
        hidden
        required
      />
      <p className="text-xl mt-4">Blog Title</p>
      <input
        name="title"
        value={data.title}
        onChange={onChangeHandler}
        type="text"
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Type here"
        required
      />

      <p className="text-xl mt-4">Blog Description</p>
      <textarea
        name="description"
        value={data.description}
        onChange={onChangeHandler}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        placeholder="Write content here"
        rows={6}
        required
      />
      <p className="text-xl mt-4">Blog Category</p>
      <select
        name="category"
        value={data.category}
        onChange={onChangeHandler}
        className="w-40 mt-4 px-4 py-3 border text-gray-500"
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>
      <br />
      <button type="submit" className="mt-8 w-40 h-12 bg-black text-white mb-6">
        ADD
      </button>
    </form>
  );
};

export default Page;
