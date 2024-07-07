import Image from "next/image"
import {assets} from "@/Assets/assets"
import Link from "next/link"

const BlogItem = ({ title, description, category, image, id }) => {
  // Ensure the image path is correct
  const imagePath = image.startsWith('http') ? image : `/${image}`;

  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-custom ">
      <Link href={`/Blogs/${id}`}>
        <Image 
          src={imagePath} 
          alt={title} 
          width={400} 
          height={300} 
          className="border-b border-black"
        />
      </Link>
      <p className="ml-5 mt-5 inline-block px-1 bg-black text-white text-sm">{category}</p>
      <div className="p-5">
        <h5 className="text-lg mb-2 font-medium text-gray-900 tracking-tight">{title}</h5>
        <p className="text-gray-600 tracking-tight text-sm mb-3" dangerouslySetInnerHTML={{__html:description.slice(0,120)}}></p>
        <Link href={`/Blogs/${id}`} className="inline-flex items-center py-2 text-center font-semibold">
          Read more <Image src={assets.arrow} alt="" className="ml-2" width={12}/>
        </Link>
      </div>
    </div>
  )
}

export default BlogItem;
