"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getSingleList,
  deleteList,
  deleteItem,
  updateList,
  markCompletedItem,
  addNewItem,
} from "@/app/user/api/supabase";
import { getCurrentUser } from "@/app/auth/api/supabase";
import { FaRegTrashAlt } from "react-icons/fa";
import EditItem from "@/components/EditItem";
import Filter from "@/components/Filter";

const EditList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split("/").at(4);
  const [completedItem, setCompletedItem] = useState(false);
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [updateValue, setUpdateValue] = useState("");
  const [item, setItem] = useState({});
  const [newItem, setNewItem] = useState({});
  const [newItemValue, setNewItemValue] = useState("");
  const [items, setItems] = useState([]);
  const [filterId, setFilterId] = useState("");

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      if (!user) {
        router.push("/");
      }
    });
    getSingleList(path).then(({ data }) => {
      setList(data);
      setItems(data?.items);
      setUpdateValue(data?.list_name);
      setFilterId("all");
    });
  }, []);

  // Invoke Delete List
  const handleDeleteList = async () => {
    try {
      const { error } = await deleteList(list?.id);
      if (!error) {
        router.push("/");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // Invoke Update List
  const handleUpdateList = async () => {
    try {
      const { data, error } = await updateList(list?.id, updateValue);
      if (error) console.log(error);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  useEffect(() => {
    handleUpdateList();
  }, [updateValue]);

  // Invoke Update Item
  const handleMarkCompleteItem = async (item) => {
    try {
      const { data, error } = await markCompletedItem(
        list.items,
        list.id,
        item?.id
      );
      setCompletedItem(!completedItem);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  // invoke Delete Item
  const handleDeleteItem = async () => {
    console.log(item);
    try {
      const { data, error } = await deleteItem(list?.id, items, item?.id);
      console.log(items);
      if (error) console.log(error);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    handleDeleteItem();
  }, [item]);

  // Add New Item

  const handleSubmitNewItem = async (e) => {
    e.preventDefault();
    if (newItemValue.length <= 0) {
      return null;
    }
    const itemId = items.at(items.length - 1);

    setNewItem({
      id: itemId?.id ? itemId?.id + 1 : 1,
      content: newItemValue,
      status: false,
    });
  };
  useEffect(() => {
    setItems((prevItem) => [...prevItem, newItem]);
  }, [newItem]);

  useEffect(() => {
    addNewItem(items, list?.id).then(() => setNewItemValue(""));
  }, [items]);

  // Filter the list
  // useEffect(() => {
  //   setFilteredItems(items);
  // console.log(filteredItems);
  // }, [filteredItems]);

  // useEffect(() => {
  //   const filter = items.filter((item) =>
  //     filterId !== "all" ? item.status === false : item.status === true
  //   );
  //   setFilteredItems(filter);
  // }, [filterId, filteredItems]);

  return (
    <div>
      <h1 className="text-center text-5xl my-8 text-primary">Edit Your List</h1>
      <div className="container w-6/12 bg-tertiary pb-2 mt-4">
        <div className="mb-8 pt-4 px-6 pb-8 text-2xl flex justify-between items-center border-b-[1px] border-font">
          <div className="flex justify-between items-center w-full mr-4">
            <label className="text-lg mr-2" htmlFor="list">
              List
            </label>
            <input
              id="list"
              className="w-full text-font focus:text-heading bg-secondary py-1 px-3 rounded-sm focus:outline-none"
              type="text"
              value={updateValue}
              onChange={(e) => setUpdateValue(e.target.value)}
            />
          </div>
          <div className="w-1/12 flex justify-between items-center text-lg">
            <span
              className="cursor-pointer text-[#f14832] hover:text-heading ml-4"
              onClick={handleDeleteList}
            >
              <FaRegTrashAlt />
            </span>
          </div>
        </div>
        {/*  */}
        <div className=" flex justify-between items-center my-4 w-full px-6">
          <form className="w-4/6" onSubmit={handleSubmitNewItem}>
            <div className="flex justify-between items-center w-full">
              <label className="mr-4" htmlFor="item">
                Item
              </label>
              <input
                id="item"
                className="w-full bg-secondary/60 py-1 px-4 rounded-sm focus:outline-none mr-4"
                type="text"
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
              />
            </div>
          </form>
          <>
            <Filter setFilterId={setFilterId} />
          </>{" "}
        </div>
        {/*  */}
        <div className="px-20 mt-10">
          {items?.length > 0 ? (
            items?.map((item, i) => {
              return (
                <div className="mb-5 flex justify-between items-center" key={i}>
                  <EditItem
                    itemValue={item.content}
                    user={user}
                    item={item}
                    setItem={setItem}
                    handleMarkCompleteItem={handleMarkCompleteItem}
                    handleDeleteItem={handleDeleteItem}
                    filterId={filterId}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center text-xl text-font">No Items</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditList;
