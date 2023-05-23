"use client";
import { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [messages, setMessages] = useState({});
  const [visibleErrorMessage, setVisibleErrorMessage] = useState(false);
  const [visibleSuccessMessage, setVisibleSuccessMessage] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        messages,
        setMessages,
        visibleErrorMessage,
        setVisibleErrorMessage,
        visibleSuccessMessage,
        setVisibleSuccessMessage,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
