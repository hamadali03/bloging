import { Connectdb } from "@/lib/config/db";

import { NextResponse } from "next/server"; 
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/model/Blog";
const fs =require('fs')
// import fs from 'fs';
// import path from 'path';

// Ensure database connection
const ensureDbConnection = async () => {
    try {
        await Connectdb();
        console.log("Database connected");
    } catch (error) {
        console.error("Failed to connect to database:", error);
    }
};

ensureDbConnection()
// Handler for GET request

export async function GET(request) {
    const blogid=request.nextUrl.searchParams.get("id")
    if(blogid){
        const blog=await BlogModel.findById(blogid)
        return NextResponse.json({blog})
    }else{
        const blog=await BlogModel.find({})
    
        // console.log("blog get hit");
        return NextResponse.json({blog});
    }
    
}

// Handler for POST request
export async function POST(request) {
    // await ensureDbConnection(); // Ensure database connection

    try {
        const formData = await request.formData();
        const timeStamp = Date.now();

        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const imagURl = `${timeStamp}_${image.name}`;
        const Path =`./public/${timeStamp}_${image.name}`;

        // Save the image file
        await writeFile(Path, buffer);
        // console.log("Image saved:", imageName);

        const blogData = {
            title: `${formData.get('title')}`,
            description: `${formData.get('description')}`,
            category: `${formData.get('category')}`,
            author: `${formData.get('author')}`,
            image: `${imagURl}`,
            authorImage: `${formData.get('authorImage')}`,
        };

        // Validate that all necessary fields are present
        // if (!blogData.title || !blogData.description || !blogData.category || !blogData.author || !blogData.image || !blogData.authorImage) {
        //     console.error('Missing required blog data fields');
        //     return NextResponse.json({ success: false, msg: "Missing required fields" }, { status: 400 });
        // }

        // Save blog data to the database
        await BlogModel.create(blogData);
        console.log("Blog saved:", blogData);

        return NextResponse.json({ success: true, msg: "Blog added" });
    } catch (error) {
        console.error('Error handling POST request:', error);
        return NextResponse.json({ success: false, msg: "Failed to add blog" }, { status: 500 });
    }
}

//end point of api del
export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        const blog = await BlogModel.findById(id);

        // if (!blog) {
        //     return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
        // }

        // Delete image file
        // fs.unlink(`./public${blog.image}`,()=>{})
        fs.unlink(`./public${blog.image}`, () => {});

        await BlogModel.findByIdAndDelete(id);

        console.log("Blog deleted:", blog);

        return NextResponse.json({ msg: "Blog Deleted" });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}