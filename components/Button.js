const Button = ({ type, btnName, customStyle, onClickHandler }) => {
  return (
    <button
      type={type || "button"}
      className={`px-4 py-2 bg-primary text-heading rounded-md text-xl w-full my-2 ${customStyle}`}
      onClick={onClickHandler}
    >
      {btnName || "Button"}
    </button>
  );
};

export default Button;
