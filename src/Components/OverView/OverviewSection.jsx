const OverviewSection = () => {
    return (
        <div className="mt-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
            {/* Overview Header */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    Discover the Beauty of Bangladesh
                </h2>
                <p className="text-lg md:text-xl text-gray-50">
                    From serene beaches to historical landmarks, explore the unique charm of Bangladesh and create unforgettable memories with a personalized trip plan.
                </p>
            </div>

            {/* Video Section */}
            <div className="mt-10 flex justify-center">
                <div className="relative w-full sm:w-3/4 lg:w-2/3 aspect-video shadow-lg">
                    <iframe 
                        width="560" 
                        height="315" 
                        src="https://www.youtube.com/embed/JLjvEYMBGzQ?si=wdbIsJ0t2bfGF2ab" 
                        title="Bangladeshi Tourist Spots Overview" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-50 hover:scale-105 hover:translate-y-3 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Explore Beaches</h3>
                    <p className="text-gray-600">
                        Relax on the golden sands of Cox’s Bazar, the world’s longest sea beach, or enjoy the sunrise at Kuakata.
                    </p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-50 hover:scale-105 hover:translate-y-3 hover:perspective-1000 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Historical Wonders</h3>
                    <p className="text-gray-600">
                        Step back in time at Lalbagh Fort, Ahsan Manzil, or the ancient Paharpur Buddhist Monastery.
                    </p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-50 hover:scale-105 hover:translate-y-3 hover:perspective-1000 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Nature’s Serenity</h3>
                    <p className="text-gray-600">
                        Experience the tranquility of Sundarbans, home to the majestic Royal Bengal Tiger, or the lush greenery of Jaflong.
                    </p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-50 hover:scale-105 hover:translate-y-3 hover:perspective-1000 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cultural Experiences</h3>
                    <p className="text-gray-600">
                        Immerse yourself in vibrant Bengali culture through festivals, local cuisines, and traditional crafts.
                    </p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-50 hover:scale-105 hover:translate-y-3 hover:perspective-1000 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Adventure Awaits</h3>
                    <p className="text-gray-600">
                        Embark on thrilling adventures, from trekking in Bandarban to exploring the coral beauty of St. Martin's Island.
                    </p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-50 hover:scale-105 hover:translate-y-3 hover:perspective-1000 transition-all duration-300">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customized Trips</h3>
                    <p className="text-gray-600">
                        Plan a personalized journey to suit your preferences, whether you're traveling solo or with a group.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OverviewSection;
