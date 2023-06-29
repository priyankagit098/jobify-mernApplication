import { CLEAR_ALERT,HANDLE_CHANGE ,DISPLAY_ALERT,TOGGLE_SIDEBAR ,
   REGISTER_USER_BEGIN, REGISTER_USER_ERROR, GET_CURRENT_USER_BEGIN,GET_CURRENT_USER_SUCCESS,
   REGISTER_USER_SUCCESS, LOGIN_USER_BEGIN,CLEAR_VALUES,
   LOGIN_USER_SUCCESS,LOGIN_USER_ERROR, LOGOUT_USER,
UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
CREATE_USER_BEGIN,CREATE_USER_SUCCESS,CREATE_USER_ERROR,CHANGE_PAGE,
GET_JOBS_BEGIN,GET_JOBS_SUCCESS,SET_EDIT_JOB, DELETE_JOB_ERROR,
DELETE_JOB_BEGIN,EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS,CLEAR_FILTERS ,EDIT_JOB_ERROR, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS  } from "./actions"
import { initialState } from "./appContext"




const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT) {
    return {...state, showAlert: true, alertType: "danger", alertText: "Please provide all values!"}
    }

    if(action.type === CLEAR_ALERT) {
        return {
            ...state, showAlert: false, alertType: "", alertText: ""
        }
    }

   if (action.type===REGISTER_USER_BEGIN) {
     return {
        ...state,
        isLoading: true,

     }
}

if (action.type===REGISTER_USER_SUCCESS) {
    return {
       ...state,
       isLoading: false,
       
       user: action.payload.newUser,
    //    userLocation: action.payload.location,
    //    jobLocation: action.payload.location,
       showAlert: true,
       alertType: "success",
       alertText: action.payload.msg

    }
}


if (action.type===REGISTER_USER_ERROR) {
    return {
       ...state,
       isLoading: false,
       
       showAlert: true,
       alertType: "danger",
       alertText: action.payload.msg

    }
}


if (action.type===LOGIN_USER_BEGIN) {
    return {
       ...state,
       isLoading: true,

    }
}

if (action.type===LOGIN_USER_SUCCESS) {
   return {
      ...state,
      isLoading: false,
    
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "Login successfully, Redirecting..."

   }
}


if (action.type===LOGIN_USER_ERROR) {
   return {
      ...state,
      isLoading: false,
      
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg

   }
}


if (action.type===TOGGLE_SIDEBAR) {
   return {
      ...state,
      showSidebar: !(state.showSidebar),

   }
}

if (action.type===LOGOUT_USER) {
   return {
      ...initialState,
    userLoading:false,
   
     

   }
}
if (action.type===UPDATE_USER_BEGIN) {
   return {
      ...state,
      isLoading: true,

   }
}

if (action.type===UPDATE_USER_SUCCESS) {
  return {
     ...state,
     isLoading: false,
    
     user: action.payload.user,
     userLocation: action.payload.location,
     jobLocation: action.payload.location,
     showAlert: true,
     alertType: "success",
     alertText: action.payload.msg

  }
}


if (action.type===UPDATE_USER_ERROR) {
  return {
     ...state,
     isLoading: false,
     
     showAlert: true,
     alertType: "danger",
     alertText: action.payload.msg

  }
}


if (action.type===HANDLE_CHANGE) {
   return {
      ...state, page: 1,[action.payload.name]: action.payload.value}
 }
 


 if (action.type===CLEAR_VALUES) {
   const initialState= {
      isEditing:false,   
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userlocation,
      jobTypeOptions: ["full-time", "part-time", "internship"],
      jobType: "part-time",
      statusOptions: ["interview", "pending", "declined"],
  
      status: "pending",
   }

   return {
      ...state, ...initialState
   }
 }

 if (action.type===CREATE_USER_BEGIN) {
   return {
      ...state,
      isLoading: true,

   }
}

if (action.type===CREATE_USER_SUCCESS) {
  return {
     ...state,
     isLoading: false,
     
     showAlert: true,
     alertType: "success",
     alertText: "New Job Created...",
     jobType: "part-time"

  }
}


if (action.type===CREATE_USER_ERROR) {
  return {
     ...state,
     isLoading: false,
     
     showAlert: true,
     alertType: "danger",
     alertText: action.payload.msg

  }
}

if (action.type===GET_JOBS_BEGIN) {
   return {
      ...state,
      isLoading: true,
      showAlert: false,

   }
}

if (action.type===GET_JOBS_SUCCESS) {
  return {
     ...state,
     isLoading: false,
     
    
     jobs: action.payload.jobs,
    totalJobs: action.payload.totalJobs,
   
    numOfPages: action.payload.numOfPages,

  }
}
if (action.type===SET_EDIT_JOB) {

   const job = state.jobs.find((job) =>job._id ===action.payload.id)
   const {_id, position, company, jobLocation, jobType, status}=job
   
   return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      status,
      jobLocation,
      jobType,
     

   }
 }
 if (action.type === DELETE_JOB_BEGIN) {
   return {
      ...state, isLoading: true
   }
 }

 if (action.type===EDIT_JOB_BEGIN) {
   return {
      ...state,
      isLoading: true,

   }
}

if (action.type===EDIT_JOB_SUCCESS) {
  return {
     ...state,
     isLoading: false,
   
     showAlert: true,
     alertType: "success",
     alertText: "Job Updated !"

  }
}


if (action.type===EDIT_JOB_ERROR) {
  return {
     ...state,
     isLoading: false,
     
     showAlert: true,
     alertType: "danger",
     alertText: action.payload.msg

  }
}


if (action.type===DELETE_JOB_ERROR) {
   return {
      ...state,
      isLoading: false,
      
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg
 
   }
 }


if (action.type===SHOW_STATS_BEGIN) {
   return {
      ...state,
      isLoading: true,
      showAlert: false

   }
}

if (action.type===SHOW_STATS_SUCCESS) {
  return {
     ...state,
     isLoading: false,
   
    stats: action.payload.stats,
    monthlyApplications: action.payload.monthlyApplications

  }
}

if (action.type=== CLEAR_FILTERS) {
   return {...state, search: "",
   searchStatus: "all",
   searchType:"all",
   sort: "latest"}
}

if (action.type===CHANGE_PAGE) {
   return{
      ...state,
      page: action.payload.page
   }
}

if (action.type === GET_CURRENT_USER_BEGIN) {
   return { ...state, userLoading: true, showAlert: false };
 }
 if (action.type === GET_CURRENT_USER_SUCCESS) {
   return {
     ...state,
     userLoading: false,
     user: action.payload.user,
     userLocation: action.payload.location,
     jobLocation: action.payload.location,
   };
 }


    throw new Error (`no such action: ${action.type}`)
}


export default reducer