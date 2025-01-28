import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";

const TourGuideForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const axioIntace = useAxiosWithInterceptors();
  // Form submit handler
  const onSubmit =async (data) => {
    
    console.log(data);
    const applyData =
    {
       titel:data.applicationTitle,
       cvLink:data.cvLink,
       whyApply:data.whyBeTourGuide,
       role:'normal'
    }
     
     const res= await axioIntace.post('/application',applyData)
     console.log(res.data);
    setShowModal(true);
    navigate(-1)
  };

  return (
    <div className="flex justify-center items-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Join as a Tour Guide</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Application Title */}
          <div className="mb-4">
            <label htmlFor="applicationTitle" className="block text-sm font-medium text-gray-700">
              Application Title
            </label>
            <input
              type="text"
              id="applicationTitle"
              {...register("applicationTitle", { required: "Application title is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.applicationTitle && (
              <p className="text-red-500 text-xs mt-1">{errors.applicationTitle.message}</p>
            )}
          </div>

          {/* Why you want to be a Tour Guide */}
          <div className="mb-4">
            <label htmlFor="whyBeTourGuide" className="block text-sm font-medium text-gray-700">
              Why do you want to be a Tour Guide?
            </label>
            <textarea
              id="whyBeTourGuide"
              {...register("whyBeTourGuide", { required: "This field is required" })}
              rows="4"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.whyBeTourGuide && (
              <p className="text-red-500 text-xs mt-1">{errors.whyBeTourGuide.message}</p>
            )}
          </div>

          {/* CV Link */}
          <div className="mb-4">
            <label htmlFor="cvLink" className="block text-sm font-medium text-gray-700">
              CV Link
            </label>
            <input
              type="url"
              id="cvLink"
              {...register("cvLink", { required: "CV Link is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.cvLink && (
              <p className="text-red-500 text-xs mt-1">{errors.cvLink.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit Application
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
              <h3 className="text-xl font-bold text-center mb-4">Application Successful</h3>
              <p className="text-center text-gray-600 mb-4">Your application has been submitted successfully.</p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <FaCheckCircle className="inline mr-2" />
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourGuideForm;
