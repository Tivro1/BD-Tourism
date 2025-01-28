import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; 
import usePackDetails from "../Hooks/usePackDetails";
import { useNavigate } from "react-router-dom";

const Tips = () => {
   const [trips, setTrips] = useState([]);
   const [packDetails] = usePackDetails();
   const navigate = useNavigate();
   useEffect(() => {
       axios.get('https://tourserver-woad.vercel.app/all-packages')
       .then(res => {
            setTrips(res.data);
       });
   }, []);
     

   const handelButton =(packageName)=>
    {  
        
        // console.log(packageName);
         const detailsData = packDetails.filter(res=> res.place === packageName.name);
         if (detailsData.length > 0) {
          navigate('/pack-details', { state: { data: detailsData , duration:packageName.duration , price:packageName.price , name:packageName.name } });
        }
    }

    return (
        <>
          <h1 className="text-white mt-[84px] text-4xl text-center pt-4 font-bold">OUR AVAILABLE TRIPS </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4 ">
                
            {trips?.map((pkg, index) => (
                <motion.div
                    key={index}
                    className="border rounded-lg shadow-md overflow-hidden bg-white bg-opacity-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <div className="w-full h-[200px] md:h-[250px] lg:h-[300px]">
                        <img
                            src={pkg?.image}
                            alt={pkg?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-4 bg-[#1b1b1b] h-full">
                        <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                        <p className="w-full h-[60px] text-sm text-white">{pkg.description}</p>
                        <p className="mt-2 text-red-600 font-semibold">
                            Price: {pkg.price}
                        </p>
                        <p className="text-white font-bold">Duration: {pkg.duration}</p>
                        <button
                            onClick={()=>handelButton(pkg)}
                            className="pl-1 pr-1 text-black font-semibold rounded-md hover:bg-green-500 bg-green-200">
                            View Details
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
        </>
    );
};

export default Tips;
