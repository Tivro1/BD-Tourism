import { motion } from "framer-motion";

const TravelerTips = () => {
  const tips = [
    {
      title: "Respect Local Customs and Traditions",
      description:
        "Bangladesh has a rich culture and history. It's important to show respect towards local customs, such as removing shoes before entering homes or religious sites.",
      icon: "🙏",
    },
    {
      title: "Stay Safe and Beware of Scams",
      description:
        "While Bangladesh is generally safe for travelers, be cautious of scams in busy tourist spots. Always agree on a price before taking a ride or purchasing goods.",
      icon: "⚠️",
    },
    {
      title: "Taste Bangladeshi Cuisine",
      description:
        "Do not miss out on Bangladeshi cuisine. Try local dishes like **Hilsa Fish**, **Bhuna Khichuri**, and **Panta Ilish** for an authentic experience.",
      icon: "🍽️",
    },
    {
      title: "Prepare for the Weather",
      description:
        "Bangladesh has a tropical climate. Make sure to carry light clothing, sunscreen, and stay hydrated, especially if you’re visiting during the hot and humid summer months.",
      icon: "☀️",
    },
  ];

  return (
    <div className=" p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Traveler Tips for Bangladesh</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 flex items-center"
            initial={{ opacity: 0, y: 20 }}  // Initial state: hidden and slightly below
            animate={{ opacity: 1, y: 0 }}   // Final state: fully visible and in place
            transition={{ delay: index * 0.2, duration: 0.5 }} // Delays animation for each tip
          >
            <div className="text-4xl text-blue-600 mr-4">{tip.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 h-[80px]">{tip.title}</h3>
              <p className="text-gray-600 mt-2">{tip.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelerTips;
