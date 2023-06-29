import React,{useReducer, useContext, useEffect} from 'react'
import { CLEAR_ALERT,HANDLE_CHANGE ,DISPLAY_ALERT, REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR, LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR 
, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, CLEAR_VALUES, 
CREATE_USER_BEGIN, CREATE_USER_SUCCESS, CREATE_USER_ERROR,
GET_JOBS_BEGIN, GET_JOBS_SUCCESS,SET_EDIT_JOB, GET_CURRENT_USER_BEGIN,GET_CURRENT_USER_SUCCESS,
DELETE_JOB_BEGIN, EDIT_JOB_BEGIN, DELETE_JOB_ERROR,EDIT_JOB_ERROR,
EDIT_JOB_SUCCESS, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_FILTERS, CHANGE_PAGE} from './actions'
import reducer from './reducers'
import axios from "axios";


// const token= localStorage.getItem("token");
// const user= localStorage.getItem("user");
// const userlocation= localStorage.getItem("location");

const initialState= {
  userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user:  null,
    // token: token? token : "",
    userLocation:"",
    jobLocation: "", 
    showSidebar:false,
    isEditing:false,   
    editJobId: "",
    position: "",
    company: "",
 
    jobTypeOptions: ["part-time", "internship", "full-time"],
    jobType:"part-time",


    statusOptions: ["interview", "pending", "declined"],

    status: "pending",
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    stats: {},
    monthlyApplications: [],
    search: "",
    searchStatus: "all",
    searchType:"all",
    sort: "latest",
    sortOptions: ["latest", "oldest", "a-z", "z-a"],

}

// create context
const AppContext = React.createContext()



const AppProvider = ({children}) => {

  // const [state, setState]= useState(initialState)
    const [state, dispatch] = useReducer(reducer, initialState)



  const axiosInstance = axios.create({
    baseURL: "/api/v1",

  })

  

// axiosInstance.interceptors.request.use((config) => {
//   config.headers["Authorization"]= `Bearer ${state.token}`
//   return config
// }, (error) => {
//   return Promise.reject(error)


// })

axiosInstance.interceptors.response.use((response) => {
 
  return response
}, (error) => {
  console.log(error)
  if(error.response.status===401) {

    
    logoutUser()
  }
  return Promise.reject(error)
})






    const dispatchAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }
    
    const clearAlert = () => {
        setTimeout(() => {
          dispatch({type: CLEAR_ALERT})
        }, 3000)
    }
 
    // const addUserToLocalStorage= ({user, token,location}) => {
    //   localStorage.setItem('user', JSON.stringify(user))
    //   localStorage.setItem("token", token)
    //   localStorage.setItem("location", location)
    // }
    
       
    // const removeUserFromLocalStorage= () => {
    //   localStorage.removeItem('user')
    //   localStorage.removeItem("token")
    //   localStorage.removeItem("location")
    // }





  
    const registerUser = async(currentUser) => {
      dispatch({type: REGISTER_USER_BEGIN})
  
    try {
      const response= await axios.post("/api/v1/user/register", currentUser)
    
      
      const {newUser, msg}=response.data
      dispatch({type: REGISTER_USER_SUCCESS,
      payload:{newUser, msg}})
     
      
     console.log(newUser)
    }
    
    catch (error) {
       dispatch({type: REGISTER_USER_ERROR, payload: {msg : error.response.data.msg},
        
      })
      
    }
  
  clearAlert()
  
  
  
  
  }






    
    
    const LoginUser = async(currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN})
    
      try {
        const response= await axios.post("/api/v1/user/login-create", currentUser)
        console.log(response)
        console.log(response.data);
        const {user,location,msg}=response.data
        dispatch({type: LOGIN_USER_SUCCESS,
        payload:{user, location,msg}})
        // addUserToLocalStorage({user, token, location})
      }
     
      catch (error) {
        if (error.response.status === 429) {
           
        dispatch({type: LOGIN_USER_ERROR, payload: {msg : "Too many requests, please try later"},
        })
        }
        
        
        dispatch({type: LOGIN_USER_ERROR, payload: {msg : error.response.data.msg},
        })
        
      }
    
    clearAlert()
    
    
    
    
    }
    



  const toggleSidebar = () => {
    dispatch({type: TOGGLE_SIDEBAR})
   
  }

  
  const logoutUser = async() => {
    await axiosInstance.get('/user/logout');
    dispatch({type: LOGOUT_USER})
    // removeUserFromLocalStorage()
  }
 


  const updateUser = async(currentUser) => {
    dispatch({type: UPDATE_USER_BEGIN})

  try {
    const response= await axiosInstance.patch("/user/update", currentUser)
   
    console.log(response.data);
    const {user,location,msg}=response.data
    dispatch({type: UPDATE_USER_SUCCESS,
    payload:{user, location,msg}})
    // addUserToLocalStorage({user, token, location})
  }
 
  catch (error) {
    
      dispatch({type: UPDATE_USER_ERROR, payload: {msg : error.response.data.msg},
      })
    
     
    console.log(error.response.data.msg)
  }

clearAlert()




}


const handleChange= ({name, value}) => {
  dispatch({
    type: HANDLE_CHANGE, 
    payload: {name, value},
  })
  
}
const clearValues= ()=> {
  dispatch({
    type: CLEAR_VALUES
  })
}
      
const createJob = async() => {
  dispatch({type: CREATE_USER_BEGIN})
  

try {
  const {position, company, jobLocation, jobType, status}= state
 const response= await axiosInstance.post("/jobs/new", {
    position, company, jobLocation, jobType, status
  })
 
   
  dispatch({type: CREATE_USER_SUCCESS})
  dispatch({type: CLEAR_VALUES})
  console.log(response)
}

catch (error) {
  if (error.response.status===401) return
  
    dispatch({type: CREATE_USER_ERROR, payload: {msg : error.response.data.msg},
    })
  
   
  // console.log(error.response)
}

clearAlert()




}

const getJobs= async() => {
  const {search, searchStatus, searchType, sort, page}= state;

let url = `/jobs/new?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
if (search) {
  url= url+`&search=${search}`;
}
  dispatch({type: GET_JOBS_BEGIN})
  try {

const {data} = await axiosInstance.get(url)
const {jobs, totalJobs, numOfPages}=data
dispatch({
  type: GET_JOBS_SUCCESS,
  payload: {
    jobs, totalJobs, numOfPages
  }
})
console.log(data.jobs)
  } catch (error) {
    logoutUser()
   
  }
}


const setEditJob = (id) => {
  dispatch({
    type: SET_EDIT_JOB,
    payload:{id}
  })
}

const editJob= async() => {
  dispatch({type: EDIT_JOB_BEGIN})
  try {
    const {position, company, jobLocation, status, jobType}=state
     await axiosInstance.patch(`/jobs/${state.editJobId}`, {
      position, company, jobLocation, status, jobType 
    })

dispatch({
  type: EDIT_JOB_SUCCESS,
 
})
dispatch({
  type: CLEAR_VALUES
})

  } catch (error) {
    if (error.response.status===401) return
  
    dispatch({type: EDIT_JOB_ERROR, payload: {msg : error.response.data.msg},
    })
  
   
  console.log(error.response)
  }
  clearAlert()
}



const deleteJob = async(id) => {
  dispatch({
    type: DELETE_JOB_BEGIN
  })
  try {
    await axiosInstance.delete(`/jobs/${id}`)
    getJobs()
    
  } catch (error) {
    if (error.response.status===401) return
  
    dispatch({type: DELETE_JOB_ERROR, payload: {msg : error.response.data.msg},
    })
  
   
 clearAlert()
  }
}


const showStats = async () => {
  dispatch({type: SHOW_STATS_BEGIN})
  try {
    const {data}= await axiosInstance.get("/jobs/stats")
    dispatch({type: SHOW_STATS_SUCCESS, payload: {
      stats: data.defaultStats,
      monthlyApplications: data.monthlyApplications
    }
  })
  } catch (error) {
    // console.log(error)
    logoutUser()

  }
  clearAlert()
}


const clearFilters= () => {
  dispatch({
    type: CLEAR_FILTERS
  })
}


const changePage= (page) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: {
      page
    }
  })
}

const getCurrentUser= async () => {
   dispatch({type: GET_CURRENT_USER_BEGIN})
   try {
    const {data}= await axiosInstance.get("/user/getCurrentUser")
   
   const {user, location}=data
   dispatch({
    type:GET_CURRENT_USER_SUCCESS,
    payload: {user,location}
   })
   } catch (error) {
    if (error.response.status===401) return
    logoutUser()
   }
    
}

useEffect(() => {
getCurrentUser()
},[])
    
    return (
     <AppContext.Provider value={{...state, dispatchAlert, LoginUser, registerUser, toggleSidebar, logoutUser, updateUser, handleChange,
     createJob ,clearValues, getJobs, setEditJob, editJob, deleteJob, showStats, clearFilters, changePage}}>
        {children}
     </AppContext.Provider>
        )
      
}

const useAppContext = () => {
    return useContext(AppContext)
}





export {AppProvider, initialState, useAppContext}