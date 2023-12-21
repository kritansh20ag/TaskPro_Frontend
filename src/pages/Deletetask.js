import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Message from "../components/Message";
import { SortbyContext } from "../context/SortbyContext";
import Sortby from "../components/Sortby";

function Deletetask() {
  const [task, setTask] = useState([]);
  const [message, setMessage] = useState([]);
  const [skip, setSkip] = useState(0);
  const [progress, setProgress] = useState(0);
  const { login, updatelogin, user, updateuser } = useContext(LoginContext);
  const { status } = useContext(SortbyContext);

  const navigate = useNavigate();
  useEffect(() => {
    fetchdata();
  }, [skip, status]);
  useEffect(() => {
    if (!login) {
      navigate("/");
    }
    if (localStorage.getItem("storeval")) {
      updateuser(JSON.parse(localStorage.getItem("user")));
      updatelogin(localStorage.getItem("login"));
    }
    setProgress(30);
    fetchdata();
  }, []);
  const handledeleteclick = (taskid) => {
    setProgress(30);
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/task/${taskid}`, {
        params: { token: user.token },
      })
      .then((res) => {
        setProgress(60);
        fetchdata();
        setMessage(["Task Deleted", "success"]);
        setTimeout(() => {
          setMessage([]);
        }, 1200);
      })
      .catch((e) => {});
  };
  const fetchdata = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/task?sortBy=completed:${status}&limit=5&skip=${skip}`,
        {
          params: { token: user.token },
        }
      )
      .then((res) => {
        setTask(res.data);
        setProgress(100);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleback = () => {
    setSkip(skip - 5);
    setProgress(20);
  };
  const handlenext = () => {
    setSkip(skip + 5);
    setProgress(20);
  };
  return (
    <>
      {message[0] && <Message message={message[0]} type={message[1]} />}
      <LoadingBar
        color="#00BFFF"
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="max-w-980 px-4 mt-4 mx-auto flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <Link
          to="/create-task"
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Create Task
        </Link>
      </div>
      <div className="max-w-980 px-4  mx-auto flex justify-between items-center mb-4">
        <Sortby />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-980 overflow-auto flex flex-col justify-center p-4">
          <table className="min-w-500 overflow-auto m-5 table-auto overflow-x-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Serial No</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Created On</th>
                <th className="py-2 px-4 border">LastUpdated On</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {task.map((task, index) => (
                <tr
                  key={task._id}
                  className={index % 2 !== 0 ? "bg-gray-50" : ""}
                >
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">
                    {task.description}
                  </td>
                  <td
                    className={`py-2 px-4 border text-center ${
                      task.completed
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    } `}
                  >
                    {task.completed ? "Complete" : "Incomplete"}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {task.createdAt.substr(0, 10)}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {task.updatedAt.substr(0, 10)}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                      onClick={() => handledeleteclick(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {task.length === 0 ? (
              <div class="bg-gray-100 border border-gray-300 rounded-md   text-center">
                <p class="text-lg font-medium text-gray-700">
                  "Boost Your Productivity with TaskPro: Create a New Task and
                  Ignite Your Workflow!"
                </p>
              </div>
            ) : (
              ""
            )}
        </div>
      </div>
      <div className="max-w-800 px-4 mt-4 mx-auto flex justify-between items-center">
        <button
          onClick={() => handleback()}
          className={` text-white py-2 px-4 rounded-lg hover:bg-gray-700 ${
            skip === 0 ? "bg-gray-700" : "bg-black"
          }`}
          disabled={skip === 0 ? true : false}
        >
          Back
        </button>
        <button
          onClick={() => handlenext()}
          disabled={task.length <= 4 ? true : false}
          className={` text-white py-2 px-4 rounded-lg hover:bg-gray-700 ${
            task.length <= 4 ? "bg-gray-700" : "bg-black"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Deletetask;
