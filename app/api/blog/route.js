
const { NextResponse } = require("next/server");
import BlogModel from "@/lib/config/models/BlogModel";
import {connectDB} from "@/lib/config/db";
import {writeFile} from "fs/promises";
const fs = require('fs');

const LoadDB = async ()=> {
    await connectDB();
}

LoadDB();

export async function GET(req){
    //request from frontend to send mongo id 

    const blogId = req.nextUrl.searchParams.get("id")
    console.log("blog id is:", blogId);


    if(blogId){
        const blog = await BlogModel.findById(blogId);
        console.log(blog);
        return NextResponse.json(blog);

    }
    else{
        const blogs = await BlogModel.find({});
        console.log("fetching all blogs")
        return NextResponse.json({blogs});
    }

    // console.log("GET Request received at /api/blog");
    
}

export async function POST(request){
    try{
        const formData = await request.formData();

    const timestamp = Date.now();
    const image = formData.get('image');

    //image.arrayBuffer() is async → it returns a Promise.
    //You forgot to await it, so Buffer.from() is receiving a Promise, not an ArrayBuffer → this will break.
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);

    const authorImage = formData.get('authorImage');
    // const authorImageByteData = await authorImage.arrayBuffer();
    // const authBuffer = Buffer.from(authorImageByteData);
    // const authPath = `./public/${timestamp}_${authorImage.name}`;
    // await writeFile(authPath, authBuffer);

    const imgUrl = `${timestamp}_${image.name}`;
    const authUrl = `${timestamp}_${authorImage.name}`;
    const title = formData.get('title');
    const desc = formData.get('description');
    const author = formData.get('author');
    
    const category = formData.get('category');

    const blogdata = {
        title:`${title}`,
        description:`${desc}`,
        category:`${category}`,
        author:`${author}`,
        authorImage: `${authUrl}`,
        image:`${imgUrl}`

    }

    //pass the object itself, do not wrap itt in{}
    await BlogModel.create(blogdata);
    console.log("Blog Created");
    // console.log(imgUrl);

return NextResponse.json({ success: true, message: "Blog Created" }, { status: 200 });
    }

    catch(e){
        console.log(e);
        return NextResponse.json({message : 'Error in POST API!'},{status:500} );
    }
    
}

//api endpoint to delete blog

export async function DELETE(req) {
    const id = await req.nextUrl.searchParams.get('id');

    const blog = await BlogModel.findById(id);

    //deleting image from public folder
    fs.unlink(`./public${blog.image}`, async ()=> {
        //delete blog ffrom db
        await BlogModel.findByIdAndDelete(id);
    } )

    return NextResponse.json({msg: "Blog deleted!"})
}