import React from 'react'
import { UseSelector, useSelector } from 'react-redux'
function Details() {
    const { posts } = useSelector(state => state.posts)
    console.log(posts)
  return (
    <div>
      
    </div>
  )
}

export default Details
