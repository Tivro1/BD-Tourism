import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const UserManageStory = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const {user}=useContext(AuthContext);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get('https://tourserver-woad.vercel.app/userStory');
      console.log(res.data);
      const filterStory = res.data.filter(item=> item.email === user.email);
      console.log(filterStory);
      setStories(filterStory);
    } catch (error) {
      console.error('Failed to fetch stories', error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://tourserver-woad.vercel.app/delete-story/${id}`);
          Swal.fire('Deleted!', 'Your story has been deleted.', 'success');
          fetchStories();
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete the story.', 'error');
        }
      }
    });
  };

  const handleEdit = (data) => {
    navigate(`/dashboard/edit-story`,{state:{story:data}});
  };

  return (
    <div className="manage-stories-container mt-[84px]">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Manage Stories</h2>
      {stories.length===0 && <h2 className='text-3xl text-red-600 font-bold'>No Sotries Available Now ! </h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{story.title}</h3>
            <p className="text-sm text-gray-600">{story.text}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {story.photoUrls.map((url, index) => (
                <img key={index} src={url} alt="story" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(story)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(story._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManageStory;
