import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, removeButton }) => {
  const blogStyle ={
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'gray',
    borderWidth: 5,
    marginBottom: 5
  }

  const removeStyle = {display: removeButton ? '' : 'none'}

  const [likes, setLikes] = useState(blog.likes)
  
  const addLike = async () => {
    const returnedBlog =  await updateBlog(blog.id)
    setLikes(returnedBlog.likes)
  }

  const blogSpec = () => (
    <div>
      <p>url: {blog.url}</p>
      <p>
        likes: {likes} 
        <button type = 'button' onClick={addLike}>like</button>
      </p>
      <p>user: {blog.user.username}</p>
      <button style = {removeStyle}>remove</button>
    </div>
  )
  return (
    <div style = {blogStyle}>
      "{blog.title}" - {blog.author}
      <Togglable firstButtonLabel="view" secondButtonLabel="hide">
        {blogSpec()}
      </Togglable>
    </div>
  )
}
export default Blog
