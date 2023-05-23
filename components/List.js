"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getCurrentUser } from "@/app/auth/api/supabase";
import Link from "next/link";

const Lists = ({ lists }) => {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    getCurrentUser().then(({ user }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      {lists?.map((list) => {
        return (
          <div className="bg-tertiary p-4 rounded-sm" key={list.id}>
            <h2 className="mb-4">
              <Link
                className="text-4xl text-font hover:text-heading"
                href={
                  user?.id === list?.user_id
                    ? `/user/${user?.id}/list/${list?.id}/edit`
                    : `/user/${user?.id}/list/${list?.id}`
                }
              >
                {list.list_name}
              </Link>
            </h2>
            <ul>
              {list?.items?.map((item, i) => {
                return i <= 2 ? (
                  <li className="hover:bg-secondary p-2" key={item.id}>
                    <span>{item.content}</span>
                  </li>
                ) : i === 3 ? (
                  <Link
                    className="text-primary text-center border-t-[1px] border-font text-xl hover:text-font block"
                    href={
                      user?.id === list?.user_id
                        ? `/user/${user?.id}/list/${list?.id}/edit`
                        : `/user/${user?.id}/list/${list?.id}`
                    }
                  >
                    See more
                  </Link>
                ) : (
                  ""
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Lists;
