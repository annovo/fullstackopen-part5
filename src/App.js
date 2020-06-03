import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogsList from './components/BlogsList'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import LoggedUser from './components/LoggedUser'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [ message, setMessage ] = useState(null)

  const blogFormRef = React.createRef()

  const createMessage = (message, styleType) => {
    setMessage ({ message, styleType })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createUser = async (newUser) => {
    try {
      const user = await loginService.login(newUser)
      createMessage(`${user.username} just logged in`, 'success')
      setUser(user)

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(user)
      )
    } catch (error) {
      createMessage('wrong username or password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      let returnedBlog = await blogService.create(blog)

      returnedBlog.user = {
        username: user.username,
        name:user.name,
        id: returnedBlog.user
      }

      const newBlogList = blogs.concat(returnedBlog)
      blogFormRef.current.toggleVisible()
      createMessage(`"${blog.title}" by ${blog.author} is added to list`, 'success')
      setBlogs(newBlogList)

    } catch (error) {
      createMessage('Title and url required' , 'error')
    }
  }

  const updateBlog = async (id) => {
    const blogFromDB = await blogService.getById(id)

    const updatedBlog = {
      user: blogFromDB.user.id,
      likes: blogFromDB.likes + 1,
      author: blogFromDB.author,
      title: blogFromDB.title,
      url: blogFromDB.url
    }
    const returnedBlog = await blogService.update(id, updatedBlog)
    const updatedBlogs = blogs.map(blog => {
      if(blog.id === id) {
        blog.likes = returnedBlog.likes
      }
      return blog
    })
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = async (id) => {
    try{
      await blogService.deleteBlog(id)

      const newBlogList = blogs.filter(blog => blog.id !== id)
      setBlogs(newBlogList)
      createMessage('Blog deleted' , 'success')
    } catch (error) {
      createMessage('already deleted', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    setUser(null)
  }

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if(userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  const blogForm = () => (
    <Togglable buttonUp = {false} firstButtonLabel = 'new blog' secondButtonLabel = "cancel" ref = {blogFormRef}>
      <BlogForm createBlog = {createBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <Notification message = {message} />
        <Login createUser = {createUser} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message = {message} />
      <LoggedUser name = {user.username} onClick = {handleLogout}/>
      <div>
        {blogForm()}
      </div>
      <BlogsList deleteBlog = {deleteBlog} blogs={blogs} username = {user.username} updateBlog = {updateBlog} />
    </div>
  )
}

export default App
