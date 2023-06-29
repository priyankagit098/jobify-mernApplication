import React, {useState} from 'react'

import { Link } from 'react-router-dom';

import "./index.css";
import Alert from '../../components/Alert';
import { useAppContext } from '../../context/appContext';






const Signup = () => {

  const [name, setName]= useState("");
  const [email, setEmail]= useState("");

  const [password, setPassword]= useState("");
  const {showAlert, dispatchAlert, registerUser}= useAppContext()
  
 





   
      

const handleSubmit= async (e) => {
  e.preventDefault()

  if (!email || !password || !name) {
    dispatchAlert()
    return
  }
  

  const details= {
    name, email, password

  }

registerUser(details)







  
}




return (
    <div className='form-container'>
    <div className='main-container'>
  <h1 className='' >Register</h1>
  {showAlert && <Alert/>}
 <form onSubmit={handleSubmit}>
        <div className='label-class'>
        <label htmfor="name">Name</label>
        </div>
        <div className='input-class'>
        <input type="text" id="name" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter your name"/>
        
        </div> 
        <div className='label-class'>
        <label htmfor="email">Email</label>
        </div>
        <div className='input-class'>
        <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter your email'/>
        
        </div>
        <div className='label-class'>
        <label htmfor="password">Password</label>
        </div>
        <div className='input-class'>
        <input type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'/>
        </div>
        <div className='button-main'>
        <button type="submit" className='button-class'>Submit</button>
        </div>
        <p>Already have an account? <Link to="/login" className='links'>Login</Link></p>
        </form> 
      
        
    </div>
    </div>
  )
}

export default Signup