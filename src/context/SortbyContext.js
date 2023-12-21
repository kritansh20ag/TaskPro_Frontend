import { createContext, useState } from "react";

const SortbyContext = createContext();

const SortbyContextProvider = ({ children }) => {
  const [status, setStatus] = useState("asc");
  const Updatestatus = (val) => {
    setStatus(val);
  };
  return (
    <SortbyContext.Provider value={{ status, Updatestatus }}>
      {children}
    </SortbyContext.Provider>
  );
};

export { SortbyContext, SortbyContextProvider };
