import React, {useState, useEffect} from 'react'
import "../Signup/index.css";

import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';

import { useAppContext } from '../../context/appContext';





const Login = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const {isLoading, showAlert, dispatchAlert, LoginUser, user}= useAppContext()
    
 const navigate = useNavigate()




  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/")
      }, 3000)
    }
  }, [user, navigate])
  
  

const handleSubmit= async (e) => {
  e.preventDefault()

  if (!email || !password) {
    dispatchAlert()
    return
  }


  const details= {
    email, password

  }
  console.log(details)

  LoginUser(details)
   
 

  
}
return (
  <div className='form-container'>
  <div className='login-container'>
<h1 className='' >Login</h1>
{showAlert && <Alert/>}
<form onSubmit={handleSubmit}>
<div className='label-class'>
      <label htmfor="email">Email</label>
      </div>
      <div className='input-class'>
      <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
      
      </div>
     <div className='label-class'>
      <label htmfor="password">Password</label>
      </div>
      <div className='input-class'>
      <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
      </div>
      <div className='button-main'>
      <button type="submit" className='button-class'>Submit</button>
      </div>
      <div className='button-main'>
      <button type="button" className='button-class btn-hipster' disabled={isLoading} onClick={() => LoginUser({

      
        email: "testUser@gmail.com", password: "testuser"
      })}>Demo App</button>
      </div>
      <p>Don't have an account? <Link to="/register" className='links'>Register</Link></p>
      </form> 
    
      
  </div>
  </div>
  )
}

export default Login