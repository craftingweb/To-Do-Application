"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  getCurrentUser,
  logOutUser,
  getUserData,
} from "@/app/auth/api/supabase";

const dancingScript = Dancing_Script({
  weight: "400",
  subsets: ["latin"],
});

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    getCurrentUser().then(({ user }) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    getUserData(user?.email).then(({ data }) => {
      setUserInfo(data);
    });
  }, [user]);

  return (
    <nav className="border-b-2 border-font/10 py-3 ">
      <div className="container grid grid-cols-5 justify-between items-center">
        <Link href="/">
          <div className="flex flex-col items-center col-span-1 w-fit cursor-pointer">
            <span className={`ml-2 text-4xl ${dancingScript.className}`}>
              Todo
            </span>
          </div>
        </Link>
        <ul className="flex justify-between items-center col-span-1 text-lg">
          <li className={pathname === "/" ? "text-font" : ""}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === "/user/" + user?.id ? "text-font" : ""}>
            <Link href={"/user/" + user?.id}>My Lists</Link>
          </li>
          {user && (
            <li className={pathname === "/list/new" ? "text-font" : ""}>
              <Link href="/list/new">New List</Link>
            </li>
          )}
        </ul>
        <div className="col-span-3 text-right flex justify-self-end">
          {user === null ? (
            <>
              <Link href="/auth/login" className="mr-4">
                <Button btnName="login" customStyle="bg-tertiary w-fit px-6" />
              </Link>
              <Link href="/auth/signup">
                <Button btnName="Signup" customStyle="w-fit px-6" />
              </Link>
            </>
          ) : (
            <div>
              <h1>
                Welcome{" "}
                <span className="text-primary text-xl">
                  {userInfo?.first_name + " " + userInfo?.last_name}
                </span>
              </h1>
              <Button
                btnName="Logout"
                customStyle="bg-tertiary w-fit px-6"
                onClickHandler={() => {
                  logOutUser().then(() => {
                    router.push("/");
                  });
                  setUser(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
