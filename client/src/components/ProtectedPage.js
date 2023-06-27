import React, {useEffect, useState} from 'react'
import {message } from 'antd';
import { GetCurrentUser } from '../api/users';
import {useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';




const ProtectedPage = ({children}) => {
    const {token}= useAppContext()
    const [user, setuser]= useState(null);
    const navigate= useNavigate();


 const validateToken = async() => {
   try {
    const response = await GetCurrentUser()
    if(response.success) {
        setuser(response.data)
    }
    else {
        message.error(response.message)
    }
    
   } catch (error) {
    navigate("/login")
    //  message.error(error.message)
   }
 }   

useEffect(()=> {
    if (localStorage.getItem("token")) {
        validateToken()
    }
    else {
        navigate("/login")
       
    }
  

},[])




  return (
    <div>
        {user &&  
        <div className='p-5'>
        {user.name}
        {children}
        </div>}
    </div>
  )
}

export default ProtectedPage