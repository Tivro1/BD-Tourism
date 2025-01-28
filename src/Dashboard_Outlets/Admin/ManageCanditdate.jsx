import React, { useState } from "react";
import useApplicationsCandidates from "../../Hooks/useApplicationsCandidates";
import useAxiosWithInterceptors from "../../Authentication/useAxiosWithInterceptors";
import Swal from "sweetalert2";

const ManageCanditdate = () => {
    const [applications, refetch] = useApplicationsCandidates();
    const [loading, setLoading] = useState(false);
    const axioIntace = useAxiosWithInterceptors();
    const handleAccept = async (applicationId) => {
                 
                 const changeRole = {role:'guide'}
            const res = await axioIntace.patch(`/change-role/${applicationId}`,changeRole)
             if(res.data)
             {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Application is accepted now!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch();
             }
               
    };

    const handleReject = async (applicationId) => {
        setLoading(true);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async(result) => {
            if (result.isConfirmed) {
                const res = await axioIntace.delete(`/delete-application/${applicationId}`)
                if(res.data)
                {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      refetch();
                }
            }
          });
        
        
    };

    return (
        <div className="mt-[84px] px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-4">All Applications</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">CV</th>
                        <th className="py-2 px-4 border-b">Why Apply</th>
                        <th className="py-2 px-4 border-b">Role</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-2">
                                No applications found.
                            </td>
                        </tr>
                    ) : (
                        applications.map((application) => (
                            <tr key={application._id}>
                                <td className="py-2 px-4 border-b">{application.titel}</td>
                                <td className="py-2 px-4 border-b">
                                    <a href={application.cvLink} target="_blank" rel="noopener noreferrer">
                                        View CV
                                    </a>
                                </td>
                                <td className="py-2 px-4 border-b">{application.whyApply}</td>
                                <td className="py-2 px-4 border-b">{application.role}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md"
                                        onClick={() => handleAccept(application._id, application.userId)}
                                        disabled={loading}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                                        onClick={() => handleReject(application._id)}
                                        disabled={loading}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCanditdate;
