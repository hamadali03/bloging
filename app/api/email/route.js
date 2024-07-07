import { Connectdb } from "@/lib/config/db";
import EmailModel from "@/lib/model/EmailModel";
import { NextRequest, NextResponse } from "next/server";

const LoadDB = async () => {
    await Connectdb();
};

LoadDB();

export async function POST(request) {
    const formData = await request.formData();
    const emailData = {
        email: formData.get('email'),
    };

    try {
        await EmailModel.create(emailData);
        return NextResponse.json({ success: true, msg: "Email Subscribed" });
    } catch (error) {
        console.error('Error saving email:', error);
        return NextResponse.json({ success: false, msg: "Failed to subscribe email" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
      const emails = await EmailModel.find({});
      return NextResponse.json({ emails });
    } catch (error) {
      console.error("Error fetching emails:", error);
      return NextResponse.json({ success: false, msg: "Failed to fetch emails" }, { status: 500 });
    }
  }

  export async function DELETE(request) {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
  
      if (!id) {
        return NextResponse.json({ success: false, msg: "Email ID is required" }, { status: 400 });
      }
  
      const result = await EmailModel.findByIdAndDelete(id);
  
      if (!result) {
        return NextResponse.json({ success: false, msg: "Email not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, msg: "Email deleted" });
    } catch (error) {
      console.error("Error handling DELETE request:", error);
      return NextResponse.json({ success: false, msg: "Failed to delete email" }, { status: 500 });
    }
  }