import React, {useState} from 'react'
import { useAppContext } from '../../context/appContext'
import FormRow from '../../components/FormRow'
import Alert from '../../components/Alert'

import Wrapper from "../../assets/wrappers/DashboardFormPage"


const Profile = () => {
  const {updateUser, user, showAlert, dispatchAlert, isLoading}=useAppContext()
  const [name, setName]= useState(user?.name);
  const [email, setEmail]= useState(user?.email);
  const [location, setlocation]= useState(user?.location);
  const [lastName, setlastName]= useState(user?.lastName);
 
  
  const handleSubmit=(e) => {
    e.preventDefault()
    if (!email || !name || !lastName || !location) {
      dispatchAlert()
      return
    }
    updateUser({name, email, lastName,location});
    console.log("update user");
  }
  
  return (
    <Wrapper>
      <form className='form ' onSubmit={handleSubmit}>
       <h3>Profile</h3>
       {showAlert && <Alert/>}
       <div className='form-center'>
        <FormRow type="text" name="name" value={name} handleChange={(e) => setName(e.target.value)}/>
        <FormRow type="text" name="lastName" labelText="last name" value={lastName} handleChange={(e) => setlastName(e.target.value)}/>
        <FormRow type="email"  labelText="Email" name="email" value={email} handleChange={(e) => setEmail(e.target.value)}/>
        <FormRow type="text" name="location" value={location} handleChange={(e) => setlocation(e.target.value)}/>
       <button className='btn btn-block' type="submit" disabled={isLoading}>

       {isLoading ? "Please wait" : "Save Changes"}
       </button>
       </div>
      </form>
    </Wrapper>
  )
}

export default Profile