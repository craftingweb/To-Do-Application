const Item = ({ itemValue, item }) => {
  return (
    <>
      <div className="mr-8 w-full flex justify-between bg-secondary p-3 items-center">
        <h2>{itemValue}</h2>
      </div>
    </>
  );
};

export default Item;
