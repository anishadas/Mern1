import React from 'react'
import { CircularProgress,Grid } from '@mui/material'
import { MyGrid } from './styles'
import Post from './Post/Post'
import { useSelector } from 'react-redux'
function Posts({ setCurrentId }) {
    const posts = useSelector((state)=>state.posts);
    return (
      !posts.length ? <CircularProgress /> : (
          <MyGrid  container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={6}>
                      <Post post={post} setCurrentId={setCurrentId} />
                  </Grid>
              ))}
          </MyGrid>
        )
    )
}

export default Posts