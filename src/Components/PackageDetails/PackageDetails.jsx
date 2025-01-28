import {   useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion"; // Import Framer Motion
import "swiper/css";
import "swiper/css/pagination";
import { TbBrandDaysCounter } from "react-icons/tb";
import useTourGuides from "../../Hooks/useTourGuides";
import BookingForm from "../BookingFrom/BookingForm";



const PackageDetails = () => {
  const location = useLocation();
  const { data , name, price, duration } = location.state || {}; // Access the data from the location state
  const [packdetails, setPackDetails] = useState(data[0]);
 
  const [gudies] = useTourGuides();
  // Animation Variants for Tour Plans
  const planVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };
// HandelGuide Profile

const navigate = useNavigate();
 const handelGuide = (guideData)=>
 {     
       console.log(guideData);
       navigate('/guide-profile',{state: guideData })
 }
  return (
    <>
      <div className="mt-[84px] pt-6">
        {/* Title Section */}
        <div className="mx-auto w-[450px] flex flex-col justify-center">
          <span className="text-4xl font-bold text-white">
            The Places Where We GO Together!
          </span>
          <hr className="w-full bg-black h-1" />
        </div>

        {/* Tour Gallery */}
        <div className="tour-gallery-container mt-4 p-4 rounded-lg">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {packdetails.images.map((res, index) => (
              <SwiperSlide key={index}>
                <div className="gallery-item flex justify-center items-center">
                  <img
                    src={res}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-[500px] h-[400px] object-cover rounded-lg shadow-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Tour Plans */}
        <div className="tour-plans mt-8">
          <h2 className="text-2xl font-bold text-white mb-4 ml-3">
            Our Tour Plan:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
            {packdetails.plans.map((res, index) => (
              <motion.div
                key={index}
                className="plan-item border border-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col items-center hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 text-white hover:text-black"
                variants={planVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                {/* Day Counter Circle */}
                <h1 className="flex flex-row justify-center items-center w-[80px] h-[80px] text-white hover:text-black bg-gray-700 hover:bg-white border-2 border-white rounded-full font-bold gap-1 transition-colors duration-300">
                  Day {index + 1} <TbBrandDaysCounter className="text-xl" />
                </h1>

                {/* Plan Description */}
                <h3 className="font-semibold text-lg mt-2 transition-colors duration-300">
                  {res}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* About The Tour Section */}
        <div className="about-tour-section mt-12 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">About The Tour</h2>
          <p className="text-lg mb-4">
            Embark on an unforgettable journey through breathtaking landscapes,
            cultural landmarks, and unique experiences. This tour is designed to
            provide a perfect blend of adventure and relaxation.
          </p>
          <ul className="space-y-3 text-lg">
            <li>
              <span className="font-bold">Duration:</span> {duration}
            </li>
            <li>
              <span className="font-bold">Starting Location:</span>
              {name}
            </li>
            
            <li>
              <span className="font-bold">Price:</span> ${price} per
              person
            </li>
          </ul>
        </div>
          {/*  Choose You Guide */}
          <div
          
          className="p-3 flex flex-col items-center">
            <h2 className="text-4xl text-white font-bold mt-3 mb-3 ">Our Available Guides!</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {gudies?.map((guide, index) => (
              <motion.div
                key={index}
                onClick={()=> handelGuide(guide)}
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
          </div>
              
<div>
    <BookingForm 
     name={name}
     price={price}
     ></BookingForm>
</div>
      </div>
    </>
  );
};

export default PackageDetails;
