"use client";
import { createContext, useState, useRef } from "react";

export const ListContext = createContext();
const ListContextProvider = ({ children }) => {
  const [list, setList] = useState({});
  const [listCreatedVisible, setListCreatedVisible] = useState(false);
  const [selected, setSelcted] = useState("Click to select");
  const itemInputRef = useRef(null);

  return (
    <ListContext.Provider
      value={{
        selected,
        setSelcted,
        listCreatedVisible,
        setListCreatedVisible,
        itemInputRef,
        list,
        setList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContextProvider;
