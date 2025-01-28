import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import useStories from "../Hooks/useStories";
import { motion } from "framer-motion"; 
import { Heart } from "lucide-react"; // Icon library for a modern "like" icon
import { useState } from "react";

const CommunityPage = () => {
    const [stories] = useStories(); // Fetching stories using the custom hook
    const [likedStories, setLikedStories] = useState({}); // Object to track liked stories by their _id

    const handleLike = (id) => {
        // Toggle the 'like' status for the specific story
        setLikedStories((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle like state for the story with the given id
        }));
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mt-[84px] h-auto">
            <h1 className="text-4xl font-bold text-center mb-10 text-white">
                Community Stories
            </h1>
            {stories.length === 0 ? (
                <p className="text-center text-gray-500">No stories available yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story,index) => (
                        <motion.div
                            key={index} // Use story._id as the key
                            className="p-4 border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            {/* Story Header */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={story.photoUrl}
                                    alt={`${story.name}'s story`}
                                    className="w-14 h-14 rounded-full mr-4 object-cover shadow"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {story.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {story.country} | Destination: {story.destination}
                                    </p>
                                </div>
                            </div>

                            {/* Story Content */}
                            <p className="text-gray-700 mb-4 line-clamp-3">{story.story}</p>

                            {/* Footer Section */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                                        onClick={() => handleLike(story._id)}
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${likedStories[story._id] ? 'text-red-500' : 'text-gray-500'} hover:animate-bounce`}
                                            fill={likedStories[story._id] ? "currentColor" : "none"}
                                        />
                                        <span className="ml-1 text-sm text-gray-600">Like</span>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FacebookShareButton url={window.location.href} quote={story.story}>
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                    <TwitterShareButton url={window.location.href} title={story.story}>
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <WhatsappShareButton url={window.location.href} title={story.story}>
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                </div>
                            </div>

                            {/* Story Rating */}
                            <div className="mt-4 text-yellow-500 font-semibold flex items-center">
                                Rating: {story.rating} ⭐
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommunityPage;
