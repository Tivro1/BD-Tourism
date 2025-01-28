import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const GuideProfile = () => {
  const location = useLocation();
  const guide = location.state;

  return (
    <div className="h-auto flex flex-col items-center justify-center mt-[84px] pb-[20px] ">
      {/* Profile Section */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-[80px]">
        <div className="flex items-center">
          <img
            src={guide.image}
            alt={guide.name}
            className="w-32 h-32 object-cover rounded-full mr-6"
          />
          <div>
            <h2 className="text-3xl font-semibold">{guide.name}</h2>
            <p className="text-gray-500">{guide.specialty}</p>
            <p className="text-gray-500">Experience: {guide.experience}</p>
            <p className="text-gray-500">
              Locations: {guide?.locations.join(", ")}
            </p>
            <p className="text-gray-500">Price: ${guide.price}/hour</p>
            <p className="text-gray-500">Contact: {guide.phone}</p>
            <p className="text-gray-500">Email: {guide.email}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">About {guide.name}</h3>
          <p className="text-gray-700">
            <strong>{guide.name}</strong> is an experienced guide with over 8
            years of expertise in leading wildlife tours, specializing in the
            Sundarbans. His deep knowledge of the region's flora and fauna makes
            him an exceptional choice for those looking to explore one of the
            most unique ecosystems in the world.
            <br />
            <br />
            With a passion for nature conservation and sustainable tourism,{" "}
            {guide.name} brings a wealth of experience to every tour. His
            friendly and approachable demeanor, combined with his keen insights
            into the Sundarbans' wildlife, ensures that guests not only learn
            about the environment but also develop a deeper appreciation for its
            preservation.
            <br />
            <br />
            Whether you're an avid wildlife enthusiast or a first-time visitor,{" "}
            {guide.name}'s expert guidance will enhance your journey through the
            mangrove forests and waterways of the Sundarbans, making it an
            unforgettable experience.
          </p>
        </div>
      </div>

      {/* Stories Section */}
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Memorable Stories
        </h3>
        <div className="space-y-8">
          {guide.stories.map((story, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <img
                src={story.image}
                alt={story.location}
                className="w-48 h-48 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
              />
              <div>
                <h4 className="text-xl font-semibold">{story.location}</h4>
                <p className="text-gray-700 mt-2">{story.details}</p>
                <ul className="list-disc list-inside mt-2 text-gray-500">
                  {story.memorableThings.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
