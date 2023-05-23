"use client";
import { useState, useEffect } from "react";
import { getAllLists } from "./user/api/supabase";
import Link from "next/link";
import List from "@/components/List";
import Loading from "@/components/Loading";

export default function Home() {
  const [lists, setLists] = useState([]);
  const getLists = async () => {
    try {
      const { data, error } = await getAllLists();
      setLists(data);
      if (error) console.log(error);
      console.log(data);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  // console.log(data);

  return (
    <div className="bg-teriary w-4/6 m-auto">
      {lists ? (
        lists?.length <= 0 ? (
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
          <List lists={lists} />
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
