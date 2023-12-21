import React, { useContext, useEffect,useState } from "react";
import { LoginContext } from "../context/LoginContext";
import LoadingBar from "react-top-loading-bar";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Userlogout() {
  const [progress, setProgress] = useState(0);
  const [redirect,setRedirect] = useState(false)
  const { updatelogin, user, updateuser } = useContext(LoginContext);

  const navigate = useNavigate()
  useEffect(()=>{
   if(redirect){
    navigate('/login')
   }
  },[redirect])
  useEffect(() => {
    setProgress(40)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/logout`, {
        token: user.token,
      })
      .then((res) => {
        updatelogin(false);
        updateuser({});
        localStorage.clear()
        setProgress(100)
        setRedirect(true)
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  
  return (<>
     <LoadingBar
        color="#00BFFF"
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />

  </>)
}

export default Userlogout;
