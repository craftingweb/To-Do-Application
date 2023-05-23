"use client";
import { useState } from "react";
import Input from "./Input";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Password = ({ value, onChangeHandler }) => {
  const [visiblePass, setVisiblePass] = useState(false);

  return (
    <div className="text-lg relative">
      <Input
        type={visiblePass ? "text" : "password"}
        placeholder="Password"
        onClick={() => setVisiblePass(!visiblePass)}
        icon={visiblePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
};

export default Password;
