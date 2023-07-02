import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"
export const getPosts=async(req,res)=>{
    try{
        const postMessages=await PostMessage.find();
        // console.log(postMessages);
        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

export const createPost=async(req,res)=>{
    const post=req.body;
    const newPost=new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
    try{
        await newPost.save();
        res.status(200).json(newPost);
    }catch(error){
        res.status(409).json({message:error.message})
    }
}
// /post/123
export const updatePost=async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send(`No post with the id : ${_id}`)
    }
    const updatedPost=await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
    res.json(updatedPost);
}

export const deletePost=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with the id : ${id}`)
    }
    await PostMessage.findByIdAndRemove(id);
    console.log("delete")
    res.json({message:'post deleted successfully'})
}

export const likePost=async(req,res)=>{
    const {id}=req.params;
    // console.log("req",req)
    // check if user is authenticated - auth middleware
    if(!req.userId) {return res.json({message:'Unathenticated'});}
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with the id : ${id}`)
    }
    const post=await PostMessage.findById(id);

    // check if user has already liked or not --- only 1 like allowed
    const index=post.likes.findIndex((id)=>id===String(req.userId));
    // if user already liked, index will be some positive value, so next time he clicks like.. it will be dislike
    if(index===-1){
        // like
        post.likes.push(req.userId||"2")
    }else{
        // dislike
        post.likes=post.likes.filter(id=>id!==String(req.userId))
    }

    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true})
    res.json(updatedPost)
}



