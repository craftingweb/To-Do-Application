"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { MdOutlineWavingHand } from "react-icons/md";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import Button from "@/components/Button";
import Input from "../Input";
import { logInUser } from "../api/supabase";
import Message from "../Message";

const Login = () => {
  const [credentials, setCredentials] = useState({});
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    messages,
    setMessages,
    visibleErrorMessage,
    setVisibleErrorMessage,
    visibleSuccessMessage,
    setVisibleSuccessMessage,
    setUser,
  } = useContext(AuthContext);

  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await logInUser(credentials);
      if (data?.user === null) {
        setMessages({ ...messages, error: "Invalid credentials" });
        setVisibleErrorMessage(true);
      }
      if (data?.user !== null) {
        setMessages({ ...messages, success: "User Logged in successfully" });
        setVisibleSuccessMessage(true);
        setUser(data?.user);
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error) {
      setMessages({ ...messages, error: error.message });
      setVisibleErrorMessage(true);
    }
  };

  useEffect(() => {
    let timeout;
    if (visibleErrorMessage) {
      timeout = setTimeout(() => {
        setVisibleErrorMessage(false);
      }, 2000);
    }
    if (visibleSuccessMessage) {
      timeout = setTimeout(() => {
        setVisibleSuccessMessage(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  });

  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: "url(/auth.jpg)" }}
    >
      {/* *Error Message* */}
      <Message
        messageType={visibleErrorMessage}
        setMessageType={() => setVisibleErrorMessage(false)}
        message={messages.error}
      />
      {/* *Success Message* */}
      <Message
        messageType={visibleSuccessMessage}
        setMessageType={() => setVisibleSuccessMessage(false)}
        message={messages.success}
      />
      <div className="grid grid-cols-4 gap-x-10 from-secondary to-secondary/10 bg-gradient-to-r min-h-screen">
        <form
          className="col-span-3 xl:col-span-2 pl-10 pr-64 pt-32"
          onSubmit={onSubmitHandler}
        >
          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4 flex items-center">
              Welcome Back
              <span className="text-primary 5xl ml-4 rotate-[-90deg]">
                <MdOutlineWavingHand />
              </span>
            </h1>
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              value={credentials?.email}
              onChangeHandler={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <>
            <Input
              type={visiblePass ? "text" : "password"}
              placeholder="Password"
              handleIconOnClick={() => setVisiblePass(!visiblePass)}
              icon={visiblePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              value={credentials?.password}
              onChangeHandler={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </>
          <div>
            <Button type="submit" btnName="Login" />
          </div>
          <div className="text-font mt-6">
            Not A Memeber?{" "}
            <Link href="/auth/signup" className="text-primary">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
