import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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


const handleLogin = async (e) => {
  e.preventDefault()
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
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }
}

const handleCreate = async () => {
  // e.preventDefault()
  console.log('object', title, author, url)
  try {
    const blogsAdd = await blogService.create({
      title, author, url
    })
    setBlogs(blogs.concat(blogsAdd))
    setAuthor('')
    setTitle('')
    setUrl('')
    setSucces(`a new blog ${blogs.title} by  ${user.username} added`)
    setTimeout(() => {
      setSucces(null)
    }, 5000)
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
        <p style={{color:'red', backgroundColor:'green'}}>{errorMessage}</p>
        <form onSubmit={handleLogin} >
          <div>
            Username
            <input 
            type= "text"
            value={username}
            name="Username"
            onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input 
            type= "password"
            value={password}
            name="Password"
            onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type='submit' >Login</button>
        </form>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      {succes}
      {`${user.username} logged in.`}{' '}
      <button type="button" onClick={() => handleDeconnect()}>
        Logout
      </button>
      <div>
        <h1>create a new blog</h1>
           <form>
           <div>
              title
              <input 
              type= "text"
              value={title}
              name="title"
              onChange={({target}) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input 
              type= "text"
              value={author}
              name="author"
              onChange={({target}) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input 
              type= "url"
              value={url}
              name="url"
              onChange={({target}) => setUrl(target.value)}
              />
            </div>
            <button type='submit' onClick={() => handleCreate()} >Create</button>
           </form>
      </div>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App