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
      const returnedBlog = await blogService.create(blog)
      const newBlogList = blogs.concat(returnedBlog)
      blogFormRef.current.toggleVisible()
      createMessage(`"${blog.title}" by ${blog.author} is added to list`, 'success')
      setBlogs(newBlogList.sort((a, b) => b.likes - a.likes))

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

    const updatedBlogs = blogs.reduce((blogsArr, blog) => {
      if(blog.id === id) {
        blog.likes = updatedBlog.likes
      }
      return blogsArr.concat(blog)
     }, []) 
     setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
     return await blogService.update(id, updatedBlog)
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
    <Togglable firstButtonLabel = 'new blog' secondButtonLabel = "cancel" ref = {blogFormRef}>
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
      <LoggedUser name = {user.name} onClick = {handleLogout}/>
      <div>
      {blogForm()}
      </div>
      <BlogsList blogs={blogs} username = {user.username} updateBlog = {updateBlog} />
    </div>
  )
}

export default App
