import ReactStars from "react-rating-stars-component";
import { FacebookShareButton } from "react-share";
import useStories from "../../Hooks/useStories";
import { FaFacebook, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllStories = () => {
  const [stories] = useStories();
  const navigate = useNavigate();

  // Variants for motion effects
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger effect for child animations
      },
    },
  };

  return (
    <motion.div
      className="p-6 mt-[84px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="  text-2xl font-bold text-center text-white mb-9">
        <span className=" border-white p-3 border-b-2 rounded-xl"> Our Touriest Sotries</span>
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stories.map((story) => (
          <motion.div
            key={story._id}
            className="border border-white rounded-lg shadow-lg overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img
              src={story.photoUrl}
              alt={story.destination}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white h-[60px]">
                {story.name} - {story.destination}
              </h3>
              <p className="text-white h-[100px] ">
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
                    <FaFacebook className="text-white" />
                    <FaShare className="text-white" />
                  </div>
                </FacebookShareButton>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 flex justify-center gap-4">
        <motion.button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-[#1b1b1b] hover:bg-[#504a4a] text-white font-bold border border-white rounded shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AllStories;
