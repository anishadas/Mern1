const mongoose = require("mongoose");
const PostMessage = require("../models/postMessage");

module.exports.getPosts = async (req, res) => {
    // console.log("hellooooo")
    try {
        const postMessages = await PostMessage.find();
        // console.log("hello",postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Query -> /posts?page=1   --> page=1
// params -> /posts/:id  --> ex: /posts/123 --> id=123

module.exports.getPostsBySearch = async (req, res) => {
    // console.log("req",req.query)
    const { searchQuery, techs } = req.query;
    // console.log("search",searchQuery)
    try {
        const title = new RegExp(searchQuery.trim(), "i"); // i-->ignores case
        // const exp=new RegExp("abc+d/E","i"); --> / abc + d\/E/i
        // easy for mongoose to search
        console.log(title, techs.split(','))
        const posts = await PostMessage.find({ $or: [{ title }, { techs: { $in: techs.split(',') } }] })
        // $or --> either find title or techs
        // $in: is the techs in the array of techs equal to techs in database
        console.log("posts", posts)
        res.json({ searchedData: posts })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports.createPost = async (req, res) => {
    console.log("create post")
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
// /post/123
module.exports.updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send(`No post with the id : ${_id}`)
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    res.json(updatedPost);
}

module.exports.deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with the id : ${id}`)
    }
    await PostMessage.findByIdAndRemove(id);
    console.log("delete")
    res.json({ message: 'post deleted successfully' })
}

module.exports.likePost = async (req, res) => {
    console.log("reached server")
    const { id } = req.params;
    console.log("req",)
    // check if user is authenticated - auth middleware
    if (!req.userId) { return res.json({ message: 'Unathenticated' }); }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with the id : ${id}`)
    }
    console.log(id)
    const post = await PostMessage.findById(id);
    console.loh(post)
    // check if user has already liked or not --- only 1 like allowed
    const index = post.likes.findIndex((id) => id === String(req.userId));
    // if user already liked, index will be some positive value, so next time he clicks like.. it will be dislike
    if (index === -1) {
        // like
        post.likes.push(req.userId || "2")
    } else {
        // dislike
        post.likes = post.likes.filter(id => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}



