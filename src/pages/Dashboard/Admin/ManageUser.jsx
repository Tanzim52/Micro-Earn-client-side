import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAuth from '../../../Hooks/useAuth';

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-users");
            return res.data;
        },
    });
    const handleDeleteUser = async (id) => {
        try {
            const res = await axiosSecure.delete(`/delete-user/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("User deleted successfully");
                refetch();
            }
        } 
        catch (e) {
            toast.error("Failed to delete user");
        }
    }
    const handleUpdateRole = async (id, role) => {
        const res = await axiosSecure.patch(`/update-user-role/${id}`, { role });
        if (res.data.modifiedCount > 0) {
            toast.success(`${role} role assigned successfully`);
            refetch();
        }

    }
    return (
        <div>
            <h1 className='text-4xl text-center font-semibold uppercase pt-10'>Manage Users</h1>
            <div className="overflow-x-auto dark:text-white text-gray-700 p-6">
                <table className="table">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th className="dark:text-white text-gray-700"></th>
                            <th className="dark:text-white text-gray-700">Profile Pic</th>
                            <th className="dark:text-white text-gray-700">Name</th>
                            <th className="dark:text-white text-gray-700">Email</th>
                            <th className="dark:text-white text-gray-700">Coins</th>
                            <th className="dark:text-white text-gray-700">Role</th>
                            <th className="dark:text-white text-gray-700">Action</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user._id} className="hover hover:text-gray-700">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.imageUrl}
                                                alt={user.displayName} />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.coins}</td>
                                <td><button className='btn bg-secondary hover:bg-secondary text-white rounded-3xl'>{user.user_role}</button></td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user?._id)} className='btn btn-warning'>Remove</button>
                                    <div className="dropdown dropdown-bottom">
                                        <div tabIndex={0} role="button" className="btn text-white btn-primary m-1">Update Role </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 dark:bg-gray-900 dark:text-white rounded-box z-[1] w-52 p-2 shadow">
                                            <li><button onClick={() => handleUpdateRole(user?._id, "worker")}>Worker</button></li>
                                            <li><button onClick={() => handleUpdateRole(user?._id, "buyer")}>Buyer</button></li>
                                            <li><button onClick={() => handleUpdateRole(user?._id, "admin")}>Admin</button></li>
                                        </ul>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;