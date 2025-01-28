

import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Body from "../Layouts/Body";
import Register from "../Authentication/Register";
import Login from "../Authentication/LogIn";
import Home from "../Layouts/Home";
import PackageDetails from "../Components/PackageDetails/PackageDetails";
import Private from "../PrivateAcess/Private";
import GuideProfile from "../Components/GuidesProfie/GuideProfile";
import AllStories from "../Components/TouriestStories/AllStories";
import CommunityPage from "../Layouts/CommunityPage";
import Tips from "../Layouts/Tips";
import AboutMe from "../Layouts/AboutMe";
import DashBoard from "../Layouts/DashBoard";
import UserProfile from "../Dashboard_Outlets/Touriest/UserProfile";
import Mybookings from "../Dashboard_Outlets/Touriest/Mybookings";
import Payments from "../Components/Payments/Payments";
import StoryForm from "../Dashboard_Outlets/Touriest/StoryForm";
import TourGuideForm from "../Dashboard_Outlets/Touriest/TourGuideForm";
import UserManageStory from "../Dashboard_Outlets/Touriest/UserManageStory";
import EditeUserStory from "../Dashboard_Outlets/Touriest/EditeUserStory";
import MyassignedTours from "../Dashboard_Outlets/Guide/MyassignedTours";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../Dashboard_Outlets/Admin/AdminProfile";
import AddPackage from "../Dashboard_Outlets/Admin/AddPackage";
import Allusers from "../Dashboard_Outlets/Admin/Allusers";
import ManageCanditdate from "../Dashboard_Outlets/Admin/ManageCanditdate";
// import BookingForm from "../Components/BookingFrom/BookingForm";


    
const router = createBrowserRouter([
    {
      path:'/',
      element:<Body></Body>,
      children:[
        {
           path:'/',
           element:<Home></Home>
        },
        {
             path:'reg',
             element:<Register></Register>,
            
        },
        {
            path:'loging',
            element:<Login></Login>
        },
        {
          path:'pack-details',
          element:<Private><PackageDetails></PackageDetails></Private>
        },
        {
          path:'guide-profile',
          element:<Private><GuideProfile></GuideProfile></Private>
       },
       {
         path:'all-story',
         element:<Private><AllStories></AllStories></Private>
       },
       {
         path:'community',
         element:<CommunityPage></CommunityPage>
       },
       {
         path:'trips',
         element:<Tips></Tips>
       },
       {
         path:'about',
         element:<AboutMe></AboutMe>
       },
       {
         path:'dashboard',
         element:<Private><DashBoard></DashBoard></Private>,
         children:[
          {
             path:'userProfile',
             element:<UserProfile></UserProfile>
          },
          {
            path:'mybooking',
            element:<Mybookings></Mybookings>
          },
          {
            path:'my-payments',
            element:<Payments></Payments>
          },
          {
            path:'addstory',
            element:<StoryForm></StoryForm>
          },
          {
            path:'join-as-guide',
            element:<TourGuideForm></TourGuideForm>
          },
          {
             path:'manageStory',
             element:<UserManageStory></UserManageStory>
          },
          {
            path:'edit-story',
            element:<EditeUserStory></EditeUserStory>
          },
          {
            path:'my-assigned-tours',
            element:<MyassignedTours></MyassignedTours>
          },
          {
            path:'adminProfile',
            element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>
          },
          {
            path:'additems',
            element:<AdminRoute><AddPackage></AddPackage></AdminRoute>
          },
          {
            path:'all-users',
            element:<AdminRoute><Allusers></Allusers></AdminRoute>
          }
         ,
          {
            path:'manage-candidate',
            element:<AdminRoute><ManageCanditdate></ManageCanditdate></AdminRoute>
          }

         ]
       }
      
      ]
    }
   
    
    
  ]);
    



export default router;