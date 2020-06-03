import React from 'react'
import Blog from './Blog'

const BlogsList = ({ blogs, updateBlog, username, deleteBlog }) => {

  return (
    <div class = 'blogList'>
      {blogs.map(blog => {
        const removeBlog = blog.user && blog.user.username === username ? deleteBlog : null
        return <Blog key={blog.id} blog={blog} removeBlog = {removeBlog} updateBlog = {updateBlog} />
      }
      )}
    </div>
  )
}

export default BlogsList
