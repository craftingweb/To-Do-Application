"use client";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

const EditItem = ({
  itemValue,
  item,
  setItem,
  handleMarkCompleteItem,
  filterId,
}) => {
  const itemStructure = () => {
    return (
      <div className="mr-8 w-full flex justify-between bg-secondary p-3 items-center">
        <div className={`flex ${item?.status ? "line-through" : ""}`}>
          <h2>{itemValue}</h2>
        </div>
        <div className="flex justify-center items-center">
          <p
            className={`cursor-pointer hover:text-[#66e153] ml-4 relative ${
              item?.status ? "text-[#66e153]" : "text-heading"
            }`}
            onClick={() => {
              handleMarkCompleteItem(item);
            }}
          >
            {item?.status ? <BsCheckCircleFill /> : <BsCheckCircle />}
          </p>
          <p
            className="text-xl cursor-pointer text-[#f14832] hover:text-heading ml-4 relative"
            onClick={(e) => {
              e.target.closest("div").parentElement.parentElement.remove();
              setItem(item);
            }}
          >
            <FaRegTrashAlt />
            <span className="w-full h-full absolute inset-0"></span>
          </p>
        </div>
      </div>
    );
  };

  const renderFilter = () => {
    if (filterId === "completed" && item.status) {
      return itemStructure();
    } else if (filterId === "notcompleted" && !item.status) {
      return itemStructure();
    } else if (filterId === "all") {
      return itemStructure();
    }
  };

  return (
    <>
      {renderFilter()}
      {/* <div className="mr-8 w-full flex justify-between bg-secondary p-3 items-center">
        <div className={`flex ${item?.status ? "line-through" : ""}`}>
          <h2>{itemValue}</h2>
        </div>
        <div className="flex justify-center items-center">
          <p
            className={`cursor-pointer hover:text-[#66e153] ml-4 relative ${
              item?.status ? "text-[#66e153]" : "text-heading"
            }`}
            onClick={() => {
              handleMarkCompleteItem(item);
            }}
          >
            {item?.status ? <BsCheckCircleFill /> : <BsCheckCircle />}
          </p>
          <p
            className="text-xl cursor-pointer text-[#f14832] hover:text-heading ml-4 relative"
            onClick={(e) => {
              e.target.closest("div").parentElement.parentElement.remove();
              setItem(item);
            }}
          >
            <FaRegTrashAlt />
            <span className="w-full h-full absolute inset-0"></span>
          </p>
        </div>
      </div> */}
    </>
  );
};

export default EditItem;
