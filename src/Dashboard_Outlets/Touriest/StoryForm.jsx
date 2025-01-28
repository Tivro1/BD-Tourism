import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const StoryForm = () => {
  const navigate = useNavigate();
  const {user}=useContext(AuthContext);
  const imageApi = import.meta.env.VITE_IMAGE_API_KEY;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageApi}`;
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const images = watch('images'); // Watch the images field in the form state

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array

    if (files.length > 3) {
      Swal.fire({
        title: 'Image Selection Error',
        text: 'You can select up to 3 images only.',
        icon: 'error',
      });
      e.target.value = ''; // Reset file input if validation fails
      return;
    }

    setValue('images', files, { shouldValidate: true }); // Set the images field value
  };

  const onSubmit = async (data) => {
    const { title, text, images } = data;
  
    if (!images || images.length === 0) {
      Swal.fire({
        title: 'Image Required',
        text: 'Please upload at least one image.',
        icon: 'error',
      });
      return;
    }
  
    try {
      // Initialize an array to store uploaded image URLs
      const uploadedImages = [];
  
      // Loop through selected images and upload each to ImgBB
      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append('image', images[i]);
  
        const res = await axios.post(imageHostingApi, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        if (res.status === 200) {
          uploadedImages.push(res.data.data.display_url); // Push the URL to the array
        }
      }
  
      // Create the story data with uploaded image URLs
      const storyData = {
        title,
        text,
        name:user?.displayName,
        email:user?.email,
        photoUrls: uploadedImages, // Include all image URLs
      };
  
      // Send story data to your backend
      const response = await axios.post('https://tourserver-woad.vercel.app/user-story', storyData);
  
      if (response.data.acknowledged) {
        Swal.fire({
          title: `${title} added successfully!`,
          icon: 'success',
          draggable: true,
        });
        reset(); // Reset the form
        navigate('/'); // Navigate to home or another page
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to upload the story. Please try again.',
        icon: 'error',
      });
      console.error(error);
    }
  };
  

  return (
    <div className="story-form-container mt-[84px] px-4 sm:px-8 md:px-16 lg:px-32">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            {...register('title', {
              required: 'Title is required',
            })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Text Field */}
        <div className="mb-4">
          <label htmlFor="text" className="block text-lg font-medium text-gray-700 mb-2">
            Text
          </label>
          <textarea
            id="text"
            className={`w-full p-3 border ${errors.text ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            rows="4"
            {...register('text', {
              required: 'Text is required',
            })}
          />
          {errors.text && <p className="text-red-500 text-sm">{errors.text.message}</p>}
        </div>

        {/* File Input for Images */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-lg font-medium text-gray-700 mb-2">
            Upload Images
          </label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/*"
            className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            onChange={handleImageUpload}
          />
          {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
        </div>

        {/* Selected Images Preview */}
        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-700 mb-2">Selected Images</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(images || []).map((image, index) => (
              <div key={index} className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                <img src={URL.createObjectURL(image)} alt="preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default StoryForm;
