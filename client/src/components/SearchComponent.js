import React, {useState, useMemo} from 'react';
import {FormRow, FormRowSelect} from ".";
import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from '../context/appContext';


const SearchComponent = () => {
  const [localSearch, setLocalSearch]= useState("")
const {
  isLoading, searchStatus, searchType,sort, sortOptions, handleChange, clearFilters, jobTypeOptions, statusOptions
}    =useAppContext()

const handleSearch=(e)=> {
 console.log(e.target.value)
 handleChange({name: e.target.name, value: e.target.value})

}

const handleSubmit= (e) => {
  e.preventDefault()
  setLocalSearch("")
  clearFilters()
}

const debounce = () => {
let timeoutId
  return(e)=> {
    
    setLocalSearch(e.target.value)
    clearTimeout(timeoutId)
    timeoutId=setTimeout(() => {
     
        handleChange({name: e.target.name, value: e.target.value})

      
    },1000)
  }
}


const optimizeDebounce= useMemo(()=> debounce(),[])


  return (
   <Wrapper>
    <form className='form'>
      <h4>search form</h4>
      <div className='form-center'>
      {/* search by type */}
        <FormRow type="text" name="search" value={localSearch} handleChange={optimizeDebounce}/>

     <FormRowSelect labelText="job status" name="searchStatus" value={searchStatus} handleChange={handleSearch} list={["all", ...statusOptions]}/>
     <FormRowSelect labelText="job type" name="searchType" value={searchType} handleChange={handleSearch} list={["all", ...jobTypeOptions]}/>
     <FormRowSelect  name="sort" value={sort} handleChange={handleSearch} list={sortOptions}/>
      
      <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
  clear Filters
      </button>
      </div>
    </form>
   </Wrapper>
  )
}
export default SearchComponent