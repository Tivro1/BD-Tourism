import { useState } from 'react';
import axios from 'axios';
import useAxiosWithInterceptors from '../../Authentication/useAxiosWithInterceptors';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    place: '',
    images: ['', '', ''],
    details: '',
    plans: ['', '', '', ''],
  });

  const [simplifiedData, setSimplifiedData] = useState({
    name: '',
    price: '',
    duration: '',
    description: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const axioIntace = useAxiosWithInterceptors();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('image')) {
      const index = parseInt(name.replace('image', ''), 10);
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData({ ...formData, images: newImages });
    } else if (name.startsWith('plan')) {
      const index = parseInt(name.replace('plan', ''), 10);
      const newPlans = [...formData.plans];
      newPlans[index] = value;
      setFormData({ ...formData, plans: newPlans });
    } else if (name.startsWith('simplified')) {
      setSimplifiedData({
        ...simplifiedData,
        [name.replace('simplified-', '')]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First POST request - send full package data with images and plans
      const response1 = await axioIntace.post('/add/packages', formData);
      console.log('Package saved with full data:', response1.data);
      alert('Full package data saved successfully!');

      // Second POST request - send simplified package data
      const response2 = await axioIntace.post('/add/simplified-package', simplifiedData);
      console.log('Package saved with simplified data:', response2.data);
      alert('Simplified package data saved successfully!');

      // Reset both forms after both requests
      setFormData({
        place: '',
        images: ['', '', ''],
        details: '',
        plans: ['', '', '', ''],
      });
      setSimplifiedData({
        name: '',
        price: '',
        duration: '',
        description: '',
        image: '',
      });
    } catch (err) {
      setError('Failed to save package. Please try again.');
      console.error('Error saving package:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-md mt-[84px]">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Package</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* First Form: Full Package Data */}
        <h3 className="text-xl font-semibold mb-4">Full Package Information</h3>
        
        {/* Place Input */}
        <div className="mb-4">
          <label htmlFor="place" className="block text-sm font-medium text-gray-700">Place</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image Inputs */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Images (URLs)</label>
          {formData.images.map((image, index) => (
            <input
              key={index}
              type="url"
              name={`image${index}`}
              value={formData.images[index]}
              onChange={handleChange}
              placeholder={`Image URL ${index + 1}`}
              className="w-full p-3 mt-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>

        {/* Details Input */}
        <div className="mb-4">
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">Package Details</label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Plans Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Plans</label>
          {formData.plans.map((plan, index) => (
            <input
              key={index}
              type="text"
              name={`plan${index}`}
              value={formData.plans[index]}
              onChange={handleChange}
              placeholder={`Plan ${index + 1}`}
              className="w-full p-3 mt-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
        </div>

        {/* Second Form: Simplified Package Data */}
        <h3 className="text-xl font-semibold mb-4">Simplified Package Information</h3>

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="simplified-name" className="block text-sm font-medium text-gray-700">Package Name</label>
          <input
            type="text"
            id="simplified-name"
            name="simplified-name"
            value={simplifiedData.name}
            onChange={handleChange}
            placeholder="Sundarbans Adventure Tour"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="simplified-price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            id="simplified-price"
            name="simplified-price"
            value={simplifiedData.price}
            onChange={handleChange}
            placeholder="৳15,000"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label htmlFor="simplified-duration" className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="text"
            id="simplified-duration"
            name="simplified-duration"
            value={simplifiedData.duration}
            onChange={handleChange}
            placeholder="3 Days / 2 Nights"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="simplified-description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="simplified-description"
            name="simplified-description"
            value={simplifiedData.description}
            onChange={handleChange}
            placeholder="Explore the largest mangrove forest in the world, spot Royal Bengal Tigers, and enjoy serene boat rides."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label htmlFor="simplified-image" className="block text-sm font-medium text-gray-700">Main Image URL</label>
          <input
            type="url"
            id="simplified-image"
            name="simplified-image"
            value={simplifiedData.image}
            onChange={handleChange}
            placeholder="https://image-url"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Package'}
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
