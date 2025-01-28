import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditeUserStory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const story = location.state.story;

  const [photoUrls, setPhotoUrls] = useState(story.photoUrls || []);
  const [newPhoto, setNewPhoto] = useState("");

  const imageApi = import.meta.env.VITE_IMAGE_API_KEY;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageApi}`;

  // Remove photo logic
  const handleRemovePhoto = async (url) => {
    try {
      const response = await axios.patch(
        `https://tourserver-woad.vercel.app/stories/remove-photo/${story._id}`,
        { photoUrl: url }
      );
      if (response.data.modifiedCount > 0) {
        setPhotoUrls(photoUrls.filter((photo) => photo !== url));
      }
    } catch (error) {
      console.error("Error removing photo:", error);
    }
  };

  // Add new photo logic
  const handleAddPhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("image", newPhoto);

      const imgResponse = await axios.post(imageHostingApi, formData);
      if (imgResponse.data.success) {
        const imageUrl = imgResponse.data.data.url;

        const response = await axios.patch(
          `https://tourserver-woad.vercel.app/stories/add-photo/${story._id}`,
          { photoUrl: imageUrl }
        );

        if (response.data.modifiedCount > 0) {
          setPhotoUrls([...photoUrls, imageUrl]);
          setNewPhoto("");
        }
      }
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  // Handle updating story title or other details
  const handleUpdateStory = () => {
    navigate(`/edit-story/${story._id}`, { state: { story } });
  };

  return (
    <div className="mt-[84px] px-4">
      <h2 className="text-2xl font-semibold mb-4">{story?.title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {photoUrls.map((url, index) => (
          <div key={index} className="relative">
            <img src={url} alt={`Story Image ${index + 1}`} className="w-full rounded shadow" />
            <button
              onClick={() => handleRemovePhoto(url)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Add Photo Section */}
      <div className="mt-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewPhoto(e.target.files[0])}
          className="mb-4"
        />
        <button
          onClick={handleAddPhoto}
          disabled={!newPhoto}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Add Photo
        </button>
      </div>

      {/* Navigate to Update Story */}
      <div className="mt-6">
        <button
          onClick={handleUpdateStory}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Story Details
        </button>
      </div>
    </div>
  );
};

export default EditeUserStory;
