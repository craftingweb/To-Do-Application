"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Button from "@/components/Button";
import Input from "../Input";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { signUpUser } from "../api/supabase";
import Message from "../Message";

const Signup = () => {
  const [credentials, setCredentials] = useState({});
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    messages,
    setMessages,
    visibleErrorMessage,
    setVisibleErrorMessage,
    visibleSuccessMessage,
    setVisibleSuccessMessage,
  } = useContext(AuthContext);

  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUpUser(credentials);
      if (data.user === null) {
        setMessages({ ...messages, error: "Please fill the following fields" });
        setVisibleErrorMessage(true);
      }
      if (data.user !== null) {
        setMessages({ ...messages, success: "User created successfully" });
        setVisibleSuccessMessage(true);
        setTimeout(() => router.push("/auth/login"), 4000);
      }
    } catch (error) {
      setMessages({ ...messages, error: error.message });
      setVisibleErrorMessage(true);
    }
  };
  // console.log(messages);

  useEffect(() => {
    let timeout;
    if (visibleErrorMessage) {
      timeout = setTimeout(() => {
        setVisibleErrorMessage(false);
      }, 3000);
    }
    if (visibleSuccessMessage) {
      timeout = setTimeout(() => {
        setVisibleSuccessMessage(false);
      }, 3000);
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
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <div className="mb-4">
            <p className="text-font font-bold">Start For Free</p>
            <h1 className="text-4xl font-bold mb-4">
              Join and organize your day
              <span className="text-primary text-6xl">.</span>
            </h1>
            <div className="text-font">
              Already A Memeber?{" "}
              <Link href="/auth/login" className="text-primary">
                Login
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Input
              placeholder="First Name"
              containerStyle="mr-4"
              value={credentials?.firstName}
              onChangeHandler={(e) =>
                setCredentials({ ...credentials, firstName: e.target.value })
              }
            />
            <Input
              placeholder="Last Name"
              value={credentials?.lastName}
              onChangeHandler={(e) =>
                setCredentials({ ...credentials, lastName: e.target.value })
              }
            />
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
          <div>
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
          </div>
          <div>
            <Button type="submit" btnName="Create account" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
