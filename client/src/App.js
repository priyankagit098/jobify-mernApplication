
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"


import { ProtectedRoute, Signup, Login, Landing, Error } from './pages/index';
import { AllJob,AddJob, Profile, Stats, SharedLayout } from './pages/dashboard/index.js';

function App() {
  return (
    <div>

    
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<ProtectedRoute><SharedLayout/></ProtectedRoute>}> 

        <Route index element={<Stats/>}/>
        <Route path="all-jobs" element={<AllJob/>}/>
        <Route path="add-job" element={<AddJob/>}/>
        <Route path="profile" element={<Profile/>}/>
       
       </Route>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
