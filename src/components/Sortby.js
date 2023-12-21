import React, { useContext, useState } from "react";
import { SortbyContext } from "../context/SortbyContext";

function Sortby() {
  const [showsortby, setShowsortby] = useState(false);

  const { status, Updatestatus } = useContext(SortbyContext);

  const handleStatusChange = (e) => {
    Updatestatus(e.target.value);
    setShowsortby(!showsortby);
  };
  // const handleDateChange = (e) => {
  //   Updatedate(e.target.value);
  //   setShowsortby(!showsortby);
  // };
  const handlesortbtbtn = () => {
    setShowsortby(!showsortby);
  };
  return (
    <>
      <div className="relative">
        <button
          onClick={handlesortbtbtn}
          className="bg-black text-white py-1 px-4 rounded-lg hover:bg-gray-700"
        >
          SortBy
        </button>
        {showsortby ? (
          <div className="filter w-auto bg-gray-400 w-250 py-2 shadow-md border border-gray-300">
            <div className="flex items-center justify-between px-4 py-1">
              <h4 className="font-bold text-lg">Status</h4>
              <select
                value={status}
                onChange={handleStatusChange}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            {/* <div className="flex items-center justify-between px-4 py-1">
              <h4 className="font-bold text-lg">Date</h4>
              <select
                value={date}
                onChange={handleDateChange}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Sortby;
