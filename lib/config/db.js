import mongoose from "mongoose";

export const Connectdb=async()=>{
    await mongoose.connect('mongodb+srv://ham22:HaMadAli@cluster0.d4uifjz.mongodb.net/Blog')
    console.log("DB Connected")
}