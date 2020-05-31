import React from 'react'
import Blog from './Blog'

const BlogsList = ({ blogs, updateBlog, username }) => {

return (
  <div>
    {blogs.map(blog => {
      const removeButton = blog.user.username === username ? true : false
      return <Blog key={blog.id} blog={blog} removeButton = {removeButton} updateBlog = {updateBlog} />
    }
    )}
</div>
)
}

export default BlogsList
