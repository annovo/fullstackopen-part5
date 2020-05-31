import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle ={
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'gray',
    borderWidth: 5,
    marginBottom: 5
  }

  const removeStyle = { display: removeBlog ? '' : 'none' }

  const [likes, setLikes] = useState(blog.likes)

  const addLike = async () => {
    const returnedBlog =  await updateBlog(blog.id)
    setLikes(returnedBlog.likes)
  }

  const deleteBlog =  () => {
    if(window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)){
      removeBlog(blog.id)
    }
  }

  const blogSpec = () => (
    <div>
      <p>url: {blog.url}</p>
      <p>
        likes: {likes}
        <button type = 'button' onClick={addLike}>like</button>
      </p>
      <p>user: {blog.user.username}</p>
      <button style = {removeStyle} onClick = {deleteBlog}>remove</button>
    </div>
  )

  return (
    <div style = {blogStyle}>
      &quot;{blog.title}&quot; - {blog.author}
      <Togglable buttonUp = {true} firstButtonLabel="view" secondButtonLabel="hide">
        {blogSpec()}
      </Togglable>
    </div>
  )
}
export default Blog
