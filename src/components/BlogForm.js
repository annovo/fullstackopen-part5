import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input id = 'title' value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author : <input id = 'author' value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input id = 'url' value={url} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  )
}
export default BlogForm
