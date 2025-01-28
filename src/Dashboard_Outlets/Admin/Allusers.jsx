import React, { useState, useEffect } from "react";
import useUser from "../../Hooks/useUser";
import Select from "react-select"; // For the dropdown menu

const AllUsers = () => {
    const [users] = useUser();
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);

    // Handle search functionality
    useEffect(() => {
        let filtered = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Filter by role if selected
        if (selectedRole) {
            filtered = filtered.filter(user => user.role === selectedRole.value);
        }

        setFilteredUsers(filtered);
    }, [searchTerm, selectedRole, users]);

    // Options for the role filter dropdown
    const roleOptions = [
        { value: undefined, label: "User" },
        { value: "guide", label: "Tourist" },
        // Add more roles if needed
    ];

    return (
        <div className="mt-[84px] px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search by Name or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 w-full border rounded-md"
            />

            {/* Role Filter Dropdown */}
            <div className="mb-4">
                <Select
                    options={roleOptions}
                    onChange={setSelectedRole}
                    placeholder="Filter by Role"
                    isClearable
                />
            </div>

            {/* User Table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center py-2">No users found</td>
                        </tr>
                    ) : (
                        filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.role}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;
