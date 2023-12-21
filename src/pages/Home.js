import React, { useContext, useEffect, useState} from "react";
import { LoginContext } from "../context/LoginContext";
import LoadingBar from "react-top-loading-bar";

function Home() {
  const { login, updatelogin, user, updateuser } = useContext(LoginContext);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(30)
    if (localStorage.getItem("storeval")) {
      updateuser(JSON.parse(localStorage.getItem("user")));
      updatelogin(localStorage.getItem("login"));
    }
    setProgress(100)
  }, []);
  return (
    <>
    <LoadingBar
        color="#00BFFF"
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex flex-col homemessage bg-gray-100">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
          </header>
          <main>
            <div className="flex justify-center">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <div className="bg-white rounded shadow p-4">
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">
                      Welcome,{" "}
                      {user?.user?.name ? user?.user?.name : "Log in first!"}!
                    </h2>
                    <p className="text-gray-700">
                      {login
                        ? "Create and manage your tasks easily with our intuitive app."
                        : "Please log in to create and manage your tasks."}
                    </p>
                    <p className="text-gray-700 mt-4">
                      Designed and developed by Sarthak Omer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
