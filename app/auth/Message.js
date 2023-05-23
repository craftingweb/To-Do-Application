"use client";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Message = ({ messageType, setMessageType, message }) => {
  const { messages } = useContext(AuthContext);
  return (
    <div
      className={` absolute left-10
      ${messages?.success ? "text-[#60f360]" : "text-[#f15252]"}
       bg-tertiary py-3 px-3 rounded-sm transition-all duration-150 text-lg flex justify-between items-center ${
         messageType ? "top-10" : "-top-14"
       }`}
    >
      <span
        className="cursor-pointer p-1 rounded-sm text-font bg-secondary"
        onClick={setMessageType}
      >
        <AiOutlineClose />
      </span>
      <span className="mx-4">{message || null}</span>
      {messages?.success ? (
        <span className="text-[#60f360]">
          <BsCheckCircleFill />
        </span>
      ) : null}
    </div>
  );
};

export default Message;
