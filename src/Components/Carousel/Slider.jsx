import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel CSS
import usePlacesData from "../../Hooks/usePlacesData";
import "./Slider.css"; // Import your custom CSS file

const Slider = () => {
    const [placeData] = usePlacesData();

    return (
        <>
           <div className="w-full mt-6 font-bold mb-4 flex justify-center"> <strong className="text-4xl text-white">Popular Tourism Places </strong></div>
        <Carousel>
            {placeData.map((place, index) => {
                // Extract image keys dynamically
                const images = Object.keys(place).filter(
                    key => key.startsWith("image") && place[key]
                );

                // Render slides for each image in the object
                return images.map((imageKey, imgIndex) => (
                    <div key={`${index}-${imgIndex}`}>
                        <img
                            src={place[imageKey]}
                            alt={`Slide ${index}-${imgIndex}`}
                            className="slider-image"
                        />
                        <p className=" w-[400px] p-3  mt-2 mx-auto rounded-md text-black font-bold">{`${place.name} ${index + 1}-${imgIndex + 1}`}</p>
                    </div>
                ));
            })}
        </Carousel>
        </>
    );
};

export default Slider;
