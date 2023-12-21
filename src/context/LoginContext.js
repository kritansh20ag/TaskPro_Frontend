import { createContext, useState } from "react"

const LoginContext = createContext()

const LoginContextProvider = ({children}) =>{
    const [login,setLogin] = useState(false)
    const [user,setUser] = useState({})

    const updatelogin = (val)=>{
        setLogin(val)
        localStorage.setItem('login', `${val}`);
        localStorage.setItem('storeval',true)
    }
    const updateuser = (obj)=>{
        setUser(obj)
        localStorage.setItem('user', JSON.stringify(obj));
        localStorage.setItem('storeval',true)
    }
    return(
        <LoginContext.Provider value={{login,updatelogin,user,updateuser}}>
            {children}
        </LoginContext.Provider>
    )
}
export {LoginContext, LoginContextProvider};
