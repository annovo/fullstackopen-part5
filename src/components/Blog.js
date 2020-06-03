import React from 'react'
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

  const addLike = async () => {
    await updateBlog(blog.id)
  }

  const deleteBlog =  () => {
    if(window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`)){
      removeBlog(blog.id)
    }
  }
 
  const blogSpec = () => (
    <div>
      <p>url: {blog.url}</p>
      <p class = 'like-container'>
        likes: {blog.likes}
        <button type = 'button' class = 'like-button' onClick={addLike}>like</button>
      </p>
      { blog.user && <p>user: {blog.user.username}</p> } 
      <button class = 'delete-button' style = {removeStyle} onClick = {deleteBlog}>remove</button>
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
