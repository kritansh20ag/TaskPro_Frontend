import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../context/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Message from "../components/Message";

function Createtask() {
  const [progress, setProgress] = useState('');
  const [message, setMessage] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const { login, user } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, []);
  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProgress(40);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/task`, {
        description: taskDescription,
        token: user.token,
      })
      .then((response) => {
        setTaskDescription("");
        setProgress(100);
        setMessage(['Task Created',"success"]);
        setTimeout(() => {
          setMessage([]);
        }, 1200);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {message[0] && <Message type={message[1]} message={message[0]} />}
      <LoadingBar
        color="#00BFFF"
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="max-w-800 mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="taskDescription"
            >
              Task Description
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="text"
              id="taskDescription"
              name="taskDescription"
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
              required
            />
          </div>
          <div className="w-full flex justify-between">
            <button
              className="bg-black text-white  py-2 px-4 rounded-lg hover:bg-gray-700"
              type="submit"
            >
              Create Task
            </button>
            <Link
              to="/task"
              className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Createtask;
