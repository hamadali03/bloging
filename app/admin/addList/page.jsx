// pages/index.jsx (or your page component)
"use client"
import React, { useEffect, useState } from 'react';
// import BlogTabelItem from '../components/BlogTabelItem';
import axios from 'axios';
import BlogTabelItem from '../blogTabelItem';
import { toast } from 'react-toastify';

const Page = () => {
  const [blog, setBlog] = useState([]);


  const fetchBlog = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlog(response.data.blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  const delBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog',{
        params:{
          id:mongoId
        }
      });
      console.log(response.data.blog)
      toast.success(response.data.msg);
      fetchBlog(); // Refresh the blog list after successful deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };
  

  useEffect(() => {
    

    fetchBlog();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blog</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author name</th>
              <th scope='col' className='px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-2 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((item, index) => (
             
              <BlogTabelItem
                key={index}
                mongoId={item._id}
                // authorImg={item.authorImage} // Pass author image path
                title={item.title}
                author={item.author}
                date={item.date}
                delBlog={delBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
