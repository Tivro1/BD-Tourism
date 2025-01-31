import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useTourGuides from '../../Hooks/useTourGuides';
import useAxiosWithInterceptors from '../../Authentication/useAxiosWithInterceptors';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const BookingForm = ({ name, price }) => {
  const { user } = useContext(AuthContext);
  const [guides] = useTourGuides();
  const axioIntace = useAxiosWithInterceptors();

  // States to manage form inputs
  const [tourDate, setTourDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleGuideChange = (e) => {
    setSelectedGuide(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      packageName: name,
      touristName: user?.displayName,
      touristEmail: user?.email,
      touristImage: user?.photoURL,
      price: price,
      tourDate: tourDate,
      tourGuide: selectedGuide,
      status: 'pending',
    };

    try {
      const response = await axioIntace.post('/mybooking', bookingData);

      if (response.data) {
        // Show a success message and modal
        Swal.fire({
          title: 'Booking is Pending Now. Thank you!',
          icon: 'success',
          draggable: true,
        });
        setShowModal(true); // Show the modal
      }
    } catch (error) {
      Swal.fire({
        title: 'Something went wrong. Please try again!',
        icon: 'error',
        draggable: true,
      });
      console.log(error?.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-3xl text-center mb-6 text-white font-bold">Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="packageName" className="block text-lg text-white font-bold">Package Name</label>
          <input
            type="text"
            id="packageName"
            value={name}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md hover:bg-[#1b1b1b] hover:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="touristName" className="block text-lg text-white font-bold">Tourist Name</label>
          <input
            type="text"
            id="touristName"
            value={user?.displayName}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 hover:bg-[#1b1b1b] hover:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="touristEmail" className="block text-lg text-white font-bold">Tourist Email</label>
          <input
            type="email"
            id="touristEmail"
            value={user?.email}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 hover:bg-[#1b1b1b] hover:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="touristImage" className="block text-lg text-white font-bold">Tourist Image</label>
          <input
            type="text"
            id="touristImage"
            value={user?.photoURL}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 hover:bg-[#1b1b1b] hover:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-lg text-white font-bold">Price</label>
          <input
            type="text"
            id="price"
            value={`${price}`}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 hover:bg-[#1b1b1b] hover:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tourDate" className="block text-lg text-white font-bold">Tour Date</label>
          <DatePicker
            selected={tourDate}
            onChange={(date) => setTourDate(date)}
            className="w-full p-3 border border-gray-300 rounded-md hover:bg-[#1b1b1b] hover:text-white"
            required
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tourGuide" className="block text-lg text-white font-bold">Tour Guide</label>
          <select
            id="tourGuide"
            value={selectedGuide}
            onChange={handleGuideChange}
            className="w-full p-3 border border-gray-300 rounded-md hover:bg-[#1b1b1b] hover:text-white"
            required
          >
            <option value="" disabled>Select a guide</option>
            {guides?.map((guide) => (
              <option key={guide.name} value={guide.name}>
                {guide.name} - {guide.specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <button type="submit" className="w-full p-3 bg-green-400 text-white font-semibold rounded-md hover:bg-green-600">
            Book Now
          </button>
        </div>
      </form>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-xl font-bold mb-4">Confirm your Booking</h3>
            <p className="mb-6">Your booking is now pending. You can view your bookings on the My Bookings page.</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 mb-2"
            >
              Close
            </button>
           
           <Link to="/dashboard/mybooking" className="block w-full p-3 bg-green-400 text-white font-semibold rounded-md hover:bg-green-600">Go to My Bookings</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
