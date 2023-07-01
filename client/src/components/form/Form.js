import React, { useEffect, useState } from "react";
import { Typography, TextField } from '@mui/material'
import FileBase from 'react-file-base64';
import { MyPaper, MyForm, MyButton, FileInput } from "./styles";
import { useDispatch,useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({ title: '', message: '', hostingAt: '', selectedFile: '' });
  const dispatch = useDispatch();

  const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId,postData))
    } else {
      dispatch(createPost(postData)); 
    }
    clear();
   }
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]:e.target.value
    })
  }
  useEffect(() => {
    setPostData(post)
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', hostingAt: '', selectedFile: '' })
  }

  return (
    <MyPaper>
      <MyForm
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Project"}
        </Typography>
        {/* <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        /> */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={handleChange}
        />
        <TextField
          name="thostingAtags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.hostingAt}
          onChange={handleChange}
        />
        <FileInput>
          <FileBase
            type="file"
            multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
          />
        </FileInput>
        <MyButton
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
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
