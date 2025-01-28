import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useBooking from "../../Hooks/useBooking";
import { FaMoneyBillAlt, FaRecycle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";
import Swal from "sweetalert2";



const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [booking,refetch] = useBooking();
  const navigate = useNavigate();
  const [review , setreview]= useState(false);
  const axiosInstance = useAxiosWithInterceptors();
  // Filter bookings for the logged-in user
  const userBookings = booking.filter((res) => res.touristEmail === user.email);
//   Total Pay
const totalPrice = userBookings.reduce((total, item) => {
    // Convert item.price ("৳18,000") to integer
    const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
    return total + price;
  }, 0);

       useEffect(()=>
    {
               axiosInstance.get('/payment-history').then(res=>
               {
                 console.log(res.data);
                  const filter = res.data.filter(respons=> respons.email === user.email);
                  if(filter)
                  {
                     setreview(true)
                   
                  }
               }
               )
                
    },[])
console.log(review);

  console.log(totalPrice);
    // Payments Fuction
     const handlePay = (bookig)=>
     {
         navigate('/dashboard/my-payments',{state:{paymetData:bookig, totalPay:totalPrice}});
     }

    //  Delete Button
    const handleCancel = async (id)=>
    {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    // Sending DELETE request to remove booking by id
                    const response = await axiosInstance.delete(`/deletebooking/${id}`);
                    if (response.status === 200) {
                         refetch();
                         Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                  } catch (error) {
                    console.error("Error deleting booking:", error);
                  }
            
            }
          });


        


    }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>

      {userBookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border border-gray-300">Package Name</th>
                <th className="px-4 py-2 border border-gray-300">Tour Guide</th>
                <th className="px-4 py-2 border border-gray-300">Tour Date</th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
                <th className="px-4 py-2 border border-gray-300">Status</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((booking,index) => (
                <tr key={index} className="bg-white hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">
                    {booking.packageName}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {booking.tourGuide}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {booking.tourDate}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {booking.price}
                  </td>
                  <td
                    className={`px-4 py-2 border border-gray-300 ${
                      booking.status === "Accepted"
                        ? "text-green-600"
                        : booking.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {review?'review':`${booking.status}`}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">


                    {/* Payment Button */}
                    <button
                      className="px-3 py-1 mr-2 bg-green-400 text-white rounded hover:bg-blue-600"
                      onClick={() => handlePay(booking)}
                    >
                    <FaMoneyBillAlt></FaMoneyBillAlt>
                    </button>


                    {/* Delete Button */}
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleCancel(booking._id)}
                    >
                      <FaRecycle></FaRecycle>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No bookings found.</p>
      )}
    </div>
  );
};

// Mock Handlers (Replace these with real implementations)
// const handlePay = (id) => {
//   console.log(`Pay button clicked for booking ID: ${id}`);
// };

// const handleCancel = (id) => {
//   console.log(`Cancel button clicked for booking ID: ${id}`);
// };

export default MyBookings;
