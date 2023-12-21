import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";
import userimage from "../userimage.webp";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

function Profile() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState([]);
  const [editbutton, setEditbutton] = useState(false);
  const { login, updatelogin, user, updateuser } = useContext(LoginContext);
  const [name, setName] = useState(user?.user?.name);
  const [email, setEmail] = useState(user?.user?.email);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setProgress(30);
    if (localStorage.getItem("storeval")) {
      updateuser(JSON.parse(localStorage.getItem("user")));
      updatelogin(localStorage.getItem("login"));
    }
    if (!login) {
      navigate("/");
    }
    setProgress(100);
  }, [login]);
  const handleeditbutton = () => {
    setEditbutton(!editbutton);
  };
  const handlesavebutton = () => {
    setProgress(30);
    axios
      .patch(`${process.env.REACT_APP_API_BASE_URL}/users/me`, {
        token: user.token,
        name: name,
      })
      .then((res) => {
        updateuser(res.data);
        setProgress(100);
        setEditbutton(!editbutton);
        setMessage(["Profile Updated", "success"]);
        setTimeout(() => {
          setMessage([]);
        }, 1200);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };
  const handleImageUploadbutton = () => {
    let formData = new FormData();
    formData.append("avatar", image);
    setProgress(40);
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/me/avatar`, formData, {
        params: {
          token: user.token,
        },
      })
      .then((res) => {
        updateuser(res.data);
        setProgress(100);
        setMessage(["Image Uploaded", "success"]);
        setTimeout(() => {
          setMessage([]);
        }, 1200);
      })
      .catch((e) => {});
  };
  const handledeletebutton = () => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/users/me`, {
        params: {
          token: user.token,
        },
      })
      .then((res) => {
        updateuser({});
        updatelogin(false);
        localStorage.clear();
        setMessage(["Account deleted", "success"]);
        setTimeout(() => {
          setMessage([]);
        }, 1200);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deletprofilephoto = () => {
    setProgress(40)
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/users/me/avatar`, {
        params: {
          token: user.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        updateuser(res.data);
        setMessage(["Profile Photo Deleted", "success"]);
        setProgress(100)
        setTimeout(() => {
          setMessage([]);
        }, 1200);
      })
      .catch(() => {});
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
      <div className="flex w-full justify-around py-4">
        <div className="flex flex-col justify-around p-4 md:flex-row md:max-w-980 w-full">
          <div>
            <div className="w-full h-36 flex flex-col justify-center text-center items-center">
              <div className="w-128 h-32 overflow-hidden rounded-full flex flex-col justify-around text-center">
                <img
                  className="h-40 object-cover"
                  src={
                    user?.user?.avatar
                      ? `data:image/png;base64,${user?.user?.avatar}`
                      : userimage
                  }
                />
              </div>
            </div>
            {editbutton ? (
              <>
                {" "}
                <form
                  className="flex flex-col"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleImageUploadbutton();
                  }}
                >
                  <div className="flex justify-center items-center">
                    <input
                      type="file"
                      className="py-2 items-center"
                      accept=".png, .jpg, .jpeg"
                      required
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div className="flex justify- items-center">
                    <button
                      type="sumbit"
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg w-128"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col flex-start py-3">
            <div className="py-2 flex flex-row flex-start px-4 md:justify-center items-center">
              <label className="px-2 font-medium">Name</label>
              {editbutton ? (
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  value={name}
                  className="p-2 h-10 border border-gray-400"
                />
              ) : (
                <div className="p-2 h-10">{user?.user?.name}</div>
              )}
            </div>
            <div className="py-2 flex flex-row px-4 md:justify-center items-center">
              <label className="px-2 font-medium">Email</label>
              {editbutton ? (
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  value={email}
                  disabled={true}
                  className="p-2 h-10 border border-gray-400"
                />
              ) : (
                <div className="p-2 h-10">{user?.user?.email}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-around">
        <div className="flex w-full justify-around py-8 max-w-980">
          {!editbutton ? (
            <button
              onClick={() => {
                handleeditbutton();
              }}
              className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={deletprofilephoto}
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
              >
                Delete Profile Photo
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg"
                onClick={() => {
                  handlesavebutton();
                }}
              >
                Save Profile
              </button>
            </>
          )}
          {!editbutton ? (
            <>
              <button
                onClick={handledeletebutton}
                className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
              >
                Delete Account
              </button>{" "}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
