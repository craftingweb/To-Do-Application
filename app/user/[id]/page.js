"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserLists } from "../api/supabase";
import { getCurrentUser } from "@/app/auth/api/supabase";
import Link from "next/link";
import List from "@/components/List";
import Loading from "@/components/Loading";

const MyLists = () => {
  const [userLists, setUserLists] = useState();
  const [user, setUser] = useState();
  const router = useRouter();
  const fetchUserLists = async () => {
    try {
      const { user } = await getCurrentUser();
      if (!user) {
        router.push("/auth/login");
      }
      const { data } = await getUserLists(user?.id);
      setUser(user);
      setUserLists(data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchUserLists();
  }, []);

  return (
    <div className="bg-teriary w-4/6 m-auto">
      {userLists ? (
        userLists?.length <= 0 ? (
          <div className="text-5xl text-center text-font mt-10">
            <p>No Lists to show</p>
            <Link
              href="/list/new"
              className="text-lg text-primary hover:underline"
            >
              Click to add
            </Link>
          </div>
        ) : (
          <List lists={userLists} />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MyLists;
