import React, {useState} from 'react'

const LoginForm = ({user,handleLogin}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = (e) =>{
    e.preventDefault()
    handleLogin(username,password)
    setUsername('')
    setPassword('')
  }


    return (
        <div>
            <form onSubmit={submitLogin} >
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

export default LoginForm
