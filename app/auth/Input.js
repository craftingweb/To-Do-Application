"use client";
const Form = ({
  type,
  placeholder,
  customStyle,
  icon,
  handleIconOnClick,
  value,
  onChangeHandler,
  containerStyle,
}) => {
  return (
    <div className={`relative ${containerStyle}`}>
      <input
        type={type || "text"}
        placeholder={placeholder}
        className={`w-full py-3 px-6 rounded-md bg-tertiary focus:outline-none my-2 ${customStyle}`}
        value={value}
        onChange={onChangeHandler}
      />
      {icon ? (
        <label
          className="absolute right-6 top-6 cursor-pointer text-primary"
          onClick={handleIconOnClick}
        >
          {icon}
        </label>
      ) : null}
    </div>
  );
};

export default Form;
