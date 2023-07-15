import React, { useEffect, useState } from "react";
import { Typography, TextField, Container } from '@mui/material'
import FileBase from 'react-file-base64';
import { MyPaper, MyForm, MyButton, FileInput } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
function Form({ currentId, setCurrentId }) {

  const [postData, setPostData] = useState({ title: "", message: "", hostingAt: "", selectedFile: "",techs:""})
  // console.log(postData)
  const dispatch = useDispatch();

  const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null)
  // console.log("edit", post)
  let user = JSON.parse(localStorage.getItem('profile'));
  // console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentId)
    if (currentId !== 0) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    }

  }

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", hostingAt: "", selectedFile: "" ,techs:""});
  }

  if (!user?.result?.name) {
    // console.log(user)
    return (
      <MyPaper>
        <Typography variant="h6" align="center">
          Please Sign In to create add your own projects. Also like & check outother's as well..
        </Typography>
      </MyPaper>
    );
  }

  return (
    <MyPaper>
      <MyForm autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing ${post.title}` : 'Uploading a Project'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={undefined || postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" value={undefined || postData.message} fullWidth multiline rows={4} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="techs" variant="outlined" label="techs (coma separated)" fullWidth value={postData.techs} onChange={(e) => setPostData({ ...postData, techs: e.target.value.split(',') })} />
        <TextField name="hostingAt" variant="outlined" label="hostingAt" value={undefined || postData.hostingAt} fullWidth onChange={(e) => setPostData({ ...postData, hostingAt: e.target.value })} />
        <FileInput ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></FileInput>
        <MyButton
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          type="submit"
        >
          Submit
        </MyButton>
        <MyButton
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </MyButton>
      </MyForm>

    </MyPaper>
  );
}

export default Form;
