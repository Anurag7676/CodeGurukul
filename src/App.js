import {Route,Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import "./App.css"
import OpenRoute from "./components/core/auth/OpenRoute"
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/core/common/Navbar";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/dashbord/MyProfile";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

import ProtectedRoute from "./components/core/auth/ProtectedRoute";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Dashbord from "./pages/Dashbord";
import Settings from "./components/core/dashbord/Settings";
import EnrolledCourse from "./components/core/dashbord/EnrolledCourse";
import Cart from "./components/core/dashbord/Cart";
import MyCourse from "./components/core/dashbord/instructor/myCourse/MyCourse";
import AddCourse from "./components/core/dashbord/instructor/create course";
import EditCourse from "./components/core/dashbord/instructor/edit-course";
import CatalogPgae from "./pages/CatalogPgae";
import CoureseDetails from "./pages/CoureseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/viewCourseDetails/VideoDetails";
import { ACCOUNT_TYPE } from "./utils/constants";
import InstructorDashboard from "./components/core/dashbord/instructor/instructor-dshbord/InstructorDashboard";

const App=()=> {
  const { user } = useSelector((state) => state.profile)
  return (
   <>
       <div className="w-screen h-screen flex flex-col scroll-smooth
        bg-richblack-900 font-inter overflow-x-hidden">
         <Navbar />
         <Routes>
           <Route path='/' element ={<HomePage/>}/>
           <Route path="/catalog/:catalogName"  element={<CatalogPgae/>} />
           <Route path="/courses/:courseId" element={<CoureseDetails/>} />
           
           <Route path="/contact" element={<ContactUs/>}/>
           <Route path="/login" 
              element={
                 <OpenRoute>
                  <LoginPage/>
                 </OpenRoute>
           } />

           <Route path="/signup" element={
                         <OpenRoute>
                          <SignupPage/>
                       </OpenRoute>
                  } />
           <Route path="/reset-password"  
           element={
             <OpenRoute>
              <ResetPassword/>
             </OpenRoute>
           }/>

           <Route
             path="/update-password/:id"
             element={
              <OpenRoute>
                 <UpdatePassword/>
              </OpenRoute>
             }
            />
             <Route
             path="/verify-email"
             element={
              <OpenRoute>
                 <VerifyEmail/>
              </OpenRoute>
             }
            />
              <Route
             path="/about"
             element={
             
                 <About/>
            
             }
            />

           {/* *NESTING ROUTE  */}
            <Route 
              element={
                <ProtectedRoute>
                  <Dashbord/>
                </ProtectedRoute>
              }
             > 

             <Route path="/dashboard/my-profile" element={<MyProfile/>} />
             
             <Route path="/dashboard/settings" element={<Settings/>}/>
             <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse/>} />
             <Route path="/dashboard/purchase-history" element={<Cart/>}/>

             <Route path="/dashboard/my-courses" element={<MyCourse/>} />
             <Route path="/dashboard/add-course"   element={<AddCourse/>} />
             <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
             <Route path="/dashboard/instructor" element={<InstructorDashboard/>} />

            </Route>

            <Route
             element={<PrivateRoute>
               <ViewCourse/>
             </PrivateRoute>}
            >
            {
             user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <>
                <Route path="/view-course/:courseID/section/:sectionID/sub-section/:subSectionID" 
                  element={<VideoDetails/>}
                />
              </>
            )
           }
              
            </Route>

         </Routes>
       </div>
        
   </>
  );
}

export default App;
