import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)  
  const [succes, setSucces] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


const handleLogin = async ( username,password) => {
  console.log('logging in with', username, password)
  try {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    ) 
    blogService.setToken(user.token)
    setUser(user)
  } catch (exception) {
    setErrorMessage('wrong username and password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }
}



const handleCreate = async ( title, author, url) => {
  // e.preventDefault()
  try {
    const blogsAdd = await blogService.create({
      title, author, url
    })
    setBlogs(blogs.concat(blogsAdd))
    setSucces(`a new blog ${blogsAdd.title} ${blogsAdd.author} by  added`)
    setTimeout(() => {
      setSucces(null)
    }, 5000);
  } catch (error) {
    console.log('erreur')
  }
}

const handleDeconnect = () => {
  window.localStorage.removeItem('loggedBlogAppUser');
  setErrorMessage(`${user.username} has been logged out`);
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
  setUser(null);
}



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <div style={{color:'red', background:'green'}}>
          {errorMessage}
        </div>
        
        <LoginForm 
        handleLogin={handleLogin}
        />
      </div>
    )
  }


  return (
    <div>
      <h1>Blogs</h1>
      <p style={{color:'white', background:'green'}} >{succes} </p>
      {`${user.username} logged in.`}{' '}
      <button type="button" onClick={() => handleDeconnect()}>
        Logout
      </button>
      <div>
        <h1>create a new blog</h1>
        <Togglable buttonLabel='new note' >
          <BlogForm handleCreate={handleCreate} />
        </Togglable>
      </div>
      <br />
      {blogs.map(blog =>
        <Blog  key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App