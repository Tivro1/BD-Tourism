import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { motion } from "framer-motion"; // Import motion
import usePackages from "../../Hooks/usePackages";
import useTourGuides from "../../Hooks/useTourGuides";
import { data, useNavigate } from "react-router-dom";
import PackageDetails from "../PackageDetails/PackageDetails";
import usePackDetails from "../../Hooks/usePackDetails";
// import { useState } from "react";

const Package_Guide = () => {
  const [packages] = usePackages();
  const [gudies] = useTourGuides();
  const navigate = useNavigate();
  const [packDetails] = usePackDetails();
  // console.log(packDetails.map(res=> res.place));
  // const [selectedDetails , setSelectedDetails]=useState([])
  const handelButton =(packageName)=>
  {   
        console.log(packageName);
      // console.log(packageName);
       const detailsData = packDetails.filter(res=> res.place === packageName.name);
       if (detailsData.length > 0) {
        navigate('/pack-details', { state: { data: detailsData , duration:packageName.duration , price:packageName.price , name:packageName.name, stories:packageName.stories } });
      }
  }
  // handelGuideProfile
  
  const handelGuideProfile = (guideData)=>
  {
    navigate('/guide-profile',{state: guideData })
  }
  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 text-white">
        Explore Our Packages & Guides
      </h1>
      <Tabs>
        <TabList className="flex justify-center mb-4 space-x-4">
          <Tab className="px-6 py-2 text-sm  text-black font-bold bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 active:bg-blue-500 active:text-white">
            Packages
          </Tab>
          <Tab className="px-6 py-2 text-sm font-bold text-black bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 active:bg-blue-500 active:text-white">
            Guides
          </Tab>
        </TabList>

        <TabPanel>
          {/* Packages Tab */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  p-4">
            {packages?.map((pkg, index) => (
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
                  <p className=" w-full h-[60px] text-sm text-white">{pkg.description}</p>
                  <p className="mt-2 text-red-600 font-semibold">
                    Price: {pkg.price}
                  </p>
                  <p className="text-white font-bold">Duration: {pkg.duration}</p>
                  <button 
                   onClick={()=>handelButton(pkg)}
                  className="pl-1 pr-1 text-black font-semibold rounded-md hover:bg-green-500 bg-green-200">View Details</button>
                </div>
                
                
              
              </motion.div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          {/* Guides Tab */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {gudies?.map((guide, index) => (
              <motion.div
                onClick={()=>handelGuideProfile(guide)}
                key={index}
                className="border rounded-lg shadow-md overflow-hidden bg-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
               
              >
                <img
                  src={guide?.image}
                  alt={guide?.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{guide?.name}</h3>
                  <p className="text-gray-500">Experience: {guide?.experience}</p>
                  <p className="text-gray-600">
                    Specialty: {guide?.specialty}
                  </p>
                  <p className="font-bold text-black">Daily-Chrage: ${guide?.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Package_Guide;
