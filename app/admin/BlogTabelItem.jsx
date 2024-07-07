// components/BlogTabelItem.jsx
import React from 'react';
import Image from 'next/image';
import { assets } from '@/Assets/assets'; // Adjust the path based on your actual asset structure

const BlogTabelItem = ({ title, author, date,delBlog,mongoId }) => {
  const formattedDate = new Date(date).toDateString();

  return (
    <tr className='bg-white border-b'>
      <th scope='row' className='hidden sm:flex px-6 py-3 font-medium text-gray-900 whitespace-nowrap'>
        <div className='flex items-center gap-3'>
          <div className='h-8 w-8'>
            <Image
              src={assets.profile_icon}
              alt='Profile Icon'
              width={32}
              height={32}
            />
          </div>
          <p>{author ? author : "Author Name"}</p>
        </div>
      </th>
      <td className='px-6 py-4'>
        {title ? title : "No Title"}
      </td>
      <td className='px-6 py-4'>
        {formattedDate}
      </td>
      <td onClick={()=>delBlog(mongoId)} className='px-6 py-4 cursor-pointer'>
        x
      </td>
    </tr>
  );
};

export default BlogTabelItem;
