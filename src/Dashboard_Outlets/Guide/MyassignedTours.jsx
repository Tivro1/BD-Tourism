import { useState, useContext, useEffect } from "react";
import useBooking from "../../Hooks/useBooking";
import useTourGuides from "../../Hooks/useTourGuides";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";

const MyAssignedTours = () => {
  const [guides] = useTourGuides();
  const { user } = useContext(AuthContext);
  const [booking] = useBooking();
  const [review , setreview]= useState(false);
  const axiosInstance = useAxiosWithInterceptors();


   useEffect(()=>
    {
               axiosInstance.get('/payment-history').then(res=>
               {
                 console.log(res.data);
                  const filter = res.data.filter(respons=> respons.email === booking.touristEmail);
                  if(filter)
                  {
                     setreview(true)
                   
                  }
               }
               )
                
    },[])






  const filter2 = guides.filter((name) => name.email === user.email);
  const filter = booking.filter((item) => item.tourGuide === filter2[0]?.name);

  const [showModal, setShowModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [staTus, setStatus]=useState('');

  const handleReject = (tour) => {
    setSelectedTour(tour);
    setShowModal(true); // Show the confirmation modal
  };

  const confirmReject = () => {
    setShowModal(false);
    if (selectedTour) {
       setStatus('rejected')
    }
  };

  const handleAccept = (tour) => {
    console.log("Accepting:", tour);
    setStatus('Acepted')
  };

  return (
    <div className="mt-[84px] p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Assigned Tours</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-600 text-white text-sm uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Package Name</th>
              <th className="px-4 py-3 text-left">Tourist Name</th>
              <th className="px-4 py-3 text-left">Tour Date</th>
              <th className="px-4 py-3 text-left">Tour Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {filter.map((tour) => (
              <tr key={tour._id} className="border-b hover:bg-indigo-50">
                <td className="px-4 py-3">{tour.packageName}</td>
                <td className="px-4 py-3">{tour.touristName}</td>
                <td className="px-4 py-3">{tour.tourDate}</td>
                <td className="px-4 py-3">{tour.tourPrice}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      tour.status === "Pending"
                        ? "bg-yellow-300 text-yellow-800"
                        : tour.status === "Accepted"
                        ? "bg-green-300 text-green-800"
                        : "bg-red-300 text-red-800"
                    }`}
                  >
                    
                    {!staTus ? (review ? 'review' : `${tour.status}`) : <span>{staTus}</span>}

                  </span>
                </td>
                <td className="px-4 py-3 flex space-x-2">
                  <button
                    className="btn btn-success px-4 py-2 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-700 disabled:opacity-50"
                    disabled={!review}
                    onClick={() => handleAccept(tour)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger px-4 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-700"
                    onClick={() => handleReject(tour)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Reject</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to reject this tour?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmReject}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAssignedTours;
