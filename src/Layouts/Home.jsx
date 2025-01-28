import banner from '../assets/banner.jpeg';
import Slider from '../Components/Carousel/Slider';
import OverviewSection from '../Components/OverView/OverviewSection';
import Package_Guide from '../Components/Tabs/Package_Guide';
import Stories from '../Components/TouriestStories/Stories';
import TravelerTips from '../Components/TravelerTrips/TravelerTips';



const Home = () => {
  
    const placesName = [
        "Sundarbans",
        "Cox's Bazar",
        "Ahsan Manzil",
        "Lalbagh Fort",
        "Paharpur Buddhist Monastery",
        "St. Martin's Island",
        "Kuakata",
        "Jaflong",
        "Mahasthangarh",
    ];

    return (
        <>
            {/* Banner Section */}
            <div
                style={{
                    backgroundImage: `url(${banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="w-full h-[600px] sm:h-[500px] md:h-[600px] mt-[80px] relative"
            >
                <div className="w-full h-full bg-[#1b1b1b] bg-opacity-50 flex items-center justify-center">
                    {/* Intro Content */}
                    <div className="text-center text-white space-y-4 px-4 md:px-0 max-w-screen-lg mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            Plan Your Next Dream Trip to Bangladesh
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl">
                            Explore trending places and create a day-by-day plan in seconds.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            {placesName.map((place, index) => (
                                <button
                                    key={index}
                                    className="bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-100"
                                >
                                    {place}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Plan My Trip Card */}
            <div className="mt-10 p-6 md:p-10 rounded-lg shadow-lg max-w-screen-lg mx-auto bg-opacity-40">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-white">
                    Create a Day-by-Day Trip Plan Customized to You
                </h2>
                <form className="space-y-6">
                    {/* Destination Input */}
                    <div className="flex flex-col ">
                        <label className="text-lg text-white font-semibold">Destination</label>
                        <input
                            type="text"
                            placeholder="Enter destination (places)"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                        />
                    </div>
                    {/* Date Input */}
                    <div className="flex flex-col ">
                        <label className="text-lg font-semibold text-white">Start Date</label>
                        <input
                            type="date"
                            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300 w-full"
                        />
                    </div>
                    {/* Selection Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                        {/* First Selection */}
                        <div>
                            <label className="text-lg font-semibold text-white">Select Trip Type</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Choose an option --</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Family">Family</option>
                                <option value="Romantic">Romantic</option>
                                <option value="Nature">Nature</option>
                                <option value="Cultural">Cultural</option>
                            </select>
                        </div>
                        {/* Second Selection */}
                        <div>
                            <label className="text-lg font-semibold text-white">Select Group Size</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Choose an option --</option>
                                <option value="Solo">Solo</option>
                                <option value="Group">Group</option>
                            </select>
                        </div>
                    </div>
                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 w-full sm:w-auto"
                        >
                            Plan My Trip
                        </button>
                    </div>
                </form>
            </div>
            {/* Over VIew */}
            <div>
                 <OverviewSection></OverviewSection>
            </div>
            <div>
                 <Slider></Slider>
            </div>
            {/* Tabs Section */}
            <div>
                 <Package_Guide></Package_Guide>
            </div>
            {/* Storyies  */}
            <div>
                 <Stories></Stories>
            </div>
            <div>
                 <TravelerTips></TravelerTips>
            </div>
        </>
    );
};

export default Home;
