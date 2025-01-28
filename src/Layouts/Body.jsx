import { Outlet } from "react-router-dom";
import Navbar from "../Components/Header/NavBar";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Footer from "../Components/Footer/Footer";


const Body = () => {
    const {user}=useContext(AuthContext)
    
    return (
       <>
       
       <header>
                <Navbar></Navbar>
           </header>
       
        <main className="bg-[#1b1b1b]">
             <Outlet>

             </Outlet>
        </main>

         <footer>
        <Footer></Footer>
         </footer>
       </>
    );
};

export default Body;