import React from 'react'
import { useAppContext } from '../../context/appContext'
import {FormRow, FormRowSelect }from '../../components/'
import Alert from '../../components/Alert'

import Wrapper from "../../assets/wrappers/DashboardFormPage"


const AddJob = () => {
  const { showAlert,editJob,handleChange,createJob ,clearValues,isEditing,dispatchAlert,isLoading, position, company, jobLocation, jobType, jobTypeOptions, status, statusOptions}=useAppContext()
  
console.log(position)
  const handleSubmit=(e) => {
    e.preventDefault()
    if (!position || !company) {
      dispatchAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }


    createJob()

  }

  const handleClear =(e) => {
    e.preventDefault()
    clearValues()
  }


  
  const handleJobInput = (e) => {
    
  
     handleChange({name: e.target.name, value: e.target.value})
     
  }
  
  
  
  
  
  
  return (
   <Wrapper>
     <form className='form'>
     <h3>{isEditing ? "edit job" : "add job"}</h3>
     {showAlert && <Alert/>}
     <div className='form-center'>
      <FormRow type="text" name="position" value={position} handleChange={handleJobInput}>
   
      </FormRow>
      <FormRow type="text" name="company" value={company} handleChange={handleJobInput}>
   
      </FormRow>
      <FormRow type="text" name="jobLocation" labelText="job Location"  value={jobLocation} handleChange={handleJobInput}>
   
      </FormRow>

      <FormRowSelect name="status" value={status} 
      handleChange={handleJobInput} 
      list={statusOptions}/>
     <FormRowSelect name="jobType" labelText="Job Type" value={jobType} 
      handleChange={handleJobInput} 
      list={jobTypeOptions}/>
     
     <div className='btn-container'>
     <button className='btn btn-block submit-btn' disabled={isLoading}  type="submit" onClick={handleSubmit}>
      Submit
     </button>
     <button className='btn btn-block clear-btn' type="submit" onClick={handleClear}>
      Clear
     </button>
    </div>


     </div>
     </form>
   </Wrapper>
  )
}

export default AddJob