const Filter = ({ setFilterId }) => {
  const inputData = [
    { id: "All", name: "reorder", type: "radio" },
    { id: "NotCompleted", name: "reorder", type: "radio" },
    { id: "Completed", name: "reorder", type: "radio" },
  ];
  return (
    <form className="flex flex-col justify-end items-start bg-secondary/60 py-2 px-4 rounded-sm">
      {inputData.map((input, i) => {
        return (
          <div
            className="flex justify-between items-center w-full"
            key={input.id}
          >
            <label htmlFor={input.id.toLowerCase()} className="mr-6">
              {input.id}
            </label>
            <input
              onClick={(e) => setFilterId(e.target.id)}
              id={input.id.toLowerCase()}
              type={input.type}
              name={input.name}
            />
          </div>
        );
      })}
    </form>
  );
};

export default Filter;
