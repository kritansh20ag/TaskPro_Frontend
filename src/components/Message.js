import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

function Message(props) {

  return (
    <>
      <div>
        {/* Render your task manager UI */}
      
        {props.message && (
          <div
            className={`fixed top-10 rounded-full left-10 flex items-center  p-4 z-50 text-white ${
              props.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {props.type === "success" ? (
              <FaCheck className="mr-2" />
            ) : (
              <FaTimes className="mr-2" />
            )}
            {props.message}
          </div>
        )}
      </div>
    </>
  );
}

export default Message;
