"use client";
import React, { useContext, useEffect } from "react";
import { ListContext } from "@/context/ListContext";
const Message = () => {
  const { listCreatedVisible, setListCreatedVisible } = useContext(ListContext);
  useEffect(() => {
    if (listCreatedVisible) {
      setTimeout(() => {
        setListCreatedVisible(false);
      }, 2000);
    }
  }, [listCreatedVisible]);
  return (
    <div
      className={`text-[#52e850] text-xl text-center mb-8 ${
        listCreatedVisible ? "" : "invisible"
      }`}
    >
      New List Added
    </div>
  );
};

export default Message;
