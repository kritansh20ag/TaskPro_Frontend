import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import LoadingBar from "react-top-loading-bar";

function Userlogin() {
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { updatelogin, updateuser } = useContext(LoginContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      setProgress(progress + 30);
      navigate("/task");
    }
  }, [redirect, navigate]);
  const handlechangeemail = (event) => {
    setEmail(event.target.value);
  };
  const handlechangepassword = (event) => {
    setPassword(event.target.value);
  };
  const handlechangelogin = (e) => {
    e.preventDefault();
    setProgress(progress + 20);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setEmail("");
        setProgress(progress + 10);
        setPassword("");
        setRedirect(true);
        setProgress(progress + 20);
        updateuser(res.data);
        updatelogin(true);
        setProgress(progress + 20);
      })
      .catch((e) => {
        setErrormessage("Invalid Email or Password");
        console.log(e);
      });
  };
  return (
    <>
      {" "}
      <LoadingBar
        color="#00BFFF"
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="bg-white relative top-10 max-w-500 m-auto flex items-center justify-center p-4">
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full"
          onSubmit={handlechangelogin}
        >
          {errormessage ? (
            <>
              {" "}
              <div className="mb-3 text-red-500">
                <h1>{errormessage}</h1>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handlechangeemail}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full password-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlechangepassword}
              required
            />
            {password.length > 0 && password.length < 8 && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 8 characters long, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              </p>
            )}
          </div>
          <div className="mb-3">
            <Link to="/signup">Join us today, sign up now.</Link>
          </div>
          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700">
            Log In
          </button>
        </form>
      </div>
    </>
  );
}

export default Userlogin;
