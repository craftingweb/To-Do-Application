"use client";
import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "@/context/ListContext";
import { insertNewList } from "../../user/api/supabase";
import { getCurrentUser } from "@/app/auth/api/supabase";
import Message from "@/components/Message";
import Item from "@/components/Item";
import Link from "next/link";

const NewList = () => {
  const { setListCreatedVisible } = useContext(ListContext);
  const [listValue, setListValue] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [id, setId] = useState(1);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getCurrentUser().then(({ user }) => {
      setUser(user);
    });
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { error } = await insertNewList(listValue, items, user);
      if (!error) {
        setListValue("");
        setItems([]);
        setItemValue("");
        setListCreatedVisible(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (itemValue.length <= 0) {
      return null;
    }
    setId(id + 1);
    setItems((oldArray) => [
      ...oldArray,
      { id: id, content: itemValue, status: false },
    ]);
    setItemValue("");
  };

  return (
    <>
      {!user ? (
        <div className="text-center text-4xl mt-8">
          Please{" "}
          <Link href="/auth/login" className="text-primary uppercase">
            login{" "}
          </Link>
          to add lists
        </div>
      ) : (
        <div className="container pt-10">
          <Message />
          <div>
            <form
              className="flex flex-col justify-center items-center text-2xl"
              onSubmit={(e) => onSubmitHandler(e)}
            >
              <div className="w-4/6">
                <input
                  className="w-full bg-tertiary py-3 px-6 rounded-md focus:outline-none"
                  type="text"
                  placeholder="New List"
                  value={listValue}
                  onChange={(e) => setListValue(e.target.value)}
                />
              </div>
            </form>
            <div className="m-auto mt-6 w-4/6 flex flex-col items-start text-lg">
              <form
                className="w-full flex items-start"
                onSubmit={(e) => handleAddItem(e)}
              >
                <div className="mr-4">
                  <input
                    className="w-full bg-tertiary/40 py-1 px-4 rounded-sm focus:outline-none"
                    type="text"
                    placeholder="What is your plan?"
                    value={itemValue}
                    onChange={(e) => setItemValue(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-primary px-4 py-1 rounded-sm"
                    title="Add Item"
                    onClick={(e) => handleAddItem(e)}
                  >
                    +
                  </button>
                </div>
              </form>
              <div className="mt-6 w-4/6 text-font">
                {items?.map((item, i) => {
                  return (
                    <div
                      className="bg-tertiary/40 w-full rounded-sm py-2 px-4 flex justify-between items-center mb-4"
                      key={item.id}
                    >
                      <Item itemValue={item.content} index={i + 1} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewList;
