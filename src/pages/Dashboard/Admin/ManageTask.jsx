import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useCoins from "../../../Hooks/useCoins";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCoins();
  const { data: tasks = [], isLoading,refetch: reTasks } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-tasks");
      return res.data;
    },
  });
  const handleTaskDelete = async (task) => {

    await axiosSecure.delete(`/tasks/${task?._id}`, {
        data: { email: task?.buyer_email }, 
      });
      toast.success("Task deleted and coins updated successfully.");
      refetch();
      reTasks(); 
  };

  return (
    <div>
        <h1 className='text-4xl text-center font-semibold uppercase pt-10'>My All tasks</h1>
      <div className="overflow-x-auto dark:text-white text-gray-700 p-6">
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : (
          <table className="table">
            {/* Table Head */}
            <thead>
              <tr>
                <th className="dark:text-white text-gray-700"></th>
                <th className="dark:text-white text-gray-700">Title</th>
                <th className="dark:text-white text-gray-700">Details</th>
                <th className="dark:text-white text-gray-700">Submission Info</th>
                <th className="dark:text-white text-gray-700">Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {tasks?.map((task, index) => (
                <tr key={task._id} className="hover hover:text-gray-700">
                  <th>{index + 1}</th>
                  <td>{task.task_title}</td>
                  <td>{task.task_detail.substr(0,30)} ....</td>
                  <td>{task?.submission_info.join(", ")}</td>
                  <td>
                    <button
                      onClick={() => handleTaskDelete(task)}
                      className="btn btn-warning"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageTask;
