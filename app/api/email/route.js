import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/config/models/EmailModel";
import {  NextResponse } from "next/server";

//post method to store email in db
const LoadDB = async () =>{
    //this will get us the support of db  
    await connectDB();
}

export async function POST(req){

    const formData = await req.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }

    await EmailModel.create(emailData);

    return NextResponse.json({success: true, message: " Email Subscribed!"});

}

export async function GET(req) {
    //curly braces because we wat all the emails
    const emails = await EmailModel.find({});

    return NextResponse.json({success: true, emails}); 
}

export async function DELETE(req){

    try{
        const emailId = await req.nextUrl.searchParams.get("id");

    if(!emailId){
        return NextResponse.json({
            success: false, message: "No email is provided"
        },
        {status: 400}
        );
    }
    const deleted = await EmailModel.findByIdAndDelete(emailId);

    if(!deleted){
        return NextResponse.json({success: false, message: "Email not found"}, {status: 404});
    }

    return NextResponse.json({success: true, message: "Email Deleted!"});
    }

    catch(e){
        console.error("Error deleting email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete email" },
      { status: 500 }
    );
    }

    

}