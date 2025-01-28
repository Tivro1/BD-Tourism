import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { FacebookShareButton } from "react-share";
import useStories from "../../Hooks/useStories";
import { FaFacebook, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";
import Swal from "sweetalert2";

const Stories = () => {
    const [stories] = useStories();
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [newStory, setNewStory] = useState({
        name: "",
        country: "",
        destination: "",
        story: "",
        rating: 0,
        photoUrl: "",
    });
    const navigate = useNavigate();

    // Select the first 4 stories
    const displayedStories = stories.slice(0, 4);
    const axioIntace = useAxiosWithInterceptors();
    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStory((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Add new story to stories (mock operation here)
        console.log("New Story:", newStory);

        // Post Data In Backend ->>>>>>
        await axioIntace.post('/add-stories', newStory)
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        title: "Your Stories are Added!",
                        icon: "success",
                        draggable: true
                    });
                }
            }
            )



        setIsModalOpen(false); // Close the modal
        setNewStory({
            name: "",
            country: "",
            destination: "",
            story: "",
            rating: 0,
            photoUrl: "",
        });
    };

    return (
        <div className="bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
                Tourist Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedStories.map((story) => (
                    <div
                        key={story._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <img
                            src={story.photoUrl}
                            alt={story.destination}
                            className="h-48 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 h-[60px]">
                                {story.name} - {story.destination}
                            </h3>
                            <p className="text-gray-600 h-[100px] ">
                                {story.story.slice(0, 100)}...
                            </p>
                            <div>
                                <ReactStars
                                    value={story.rating}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <FacebookShareButton
                                    url={window.location.href}
                                    quote={`Check out this story about ${story.destination}!`}
                                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                                >
                                    <div className="flex flex-row gap-1">
                                        <FaFacebook className="text-blue-600" />
                                        <FaShare />
                                    </div>
                                </FacebookShareButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-center gap-4">
                <button
                    onClick={() => navigate("/all-story")}
                    className="px-6 py-2 bg-[#fcfcfc] border-b-2 border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-white rounded shadow"
                >
                    All Stories
                </button>
                <button
                    onClick={() => setIsModalOpen(true)} // Open the modal
                    className="px-6 py-2 bg-[#fcfcfc] border-b-2 border-[#1b1b1b] text-[#1b1b1b] hover:bg-[#1b1b1b] hover:text-white rounded shadow"
                >
                    Add Stories
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">
                            Add a New Story
                        </h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newStory.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Country:</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={newStory.country}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Destination:</label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={newStory.destination}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Story:</label>
                                <textarea
                                    name="story"
                                    value={newStory.story}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Rating:</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={newStory.rating}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Photo URL:</label>
                                <input
                                    type="text"
                                    name="photoUrl"
                                    value={newStory.photoUrl}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)} // Close the modal
                                    className="px-4 py-2 bg-gray-500 text-white rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Add Story
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stories;
