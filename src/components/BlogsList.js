import React from 'react'
import Blog from './Blog'

const BlogsList = ({ blogs, updateBlog, username, deleteBlog }) => {

  return (
    <div>
      {blogs.map(blog => {
        const removeBlog = blog.user.username === username ? deleteBlog : null
        return <Blog key={blog.id} blog={blog} removeBlog = {removeBlog} updateBlog = {updateBlog} />
      }
      )}
    </div>
  )
}

export default BlogsList
