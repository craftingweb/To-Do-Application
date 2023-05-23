"use client";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { getSingleList } from "@/app/user/api/supabase";
import { getCurrentUser } from "@/app/auth/api/supabase";
import { AuthContext } from "@/context/AuthContext";
import { ListContext } from "@/context/ListContext";
import Item from "@/components/Item";

const List = () => {
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split("/").at(4);
  const { user, setUser } = useContext(AuthContext);
  const { list, setList } = useContext(ListContext);
  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
    });
    getSingleList(path).then(({ data }) => {
      setList(data);
    });
  }, []);

  return (
    <div className="container w-5/12 bg-tertiary pb-2 mt-4">
      <ul>
        <li className="my-4 py-3 px-6 rounded-lg text-2xl flex justify-between items-center">
          <div>
            <p className="flex items-center text-4xl">{list?.list_name}</p>
          </div>
        </li>
        <div className="px-20">
          {list?.items?.map((item) => {
            return (
              <div className="flex bg-secondary mb-5 py-2 px-4" key={item.id}>
                <Item itemValue={item.content} />
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default List;
