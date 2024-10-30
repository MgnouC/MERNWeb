import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const { placeholder = "Nhập chữ vào", onChange, ...rests } = props;
  const handleonchangeInput = (e) => {
    props.handleonchange(e.target.value);
  };

  return (
    <WrapperInputStyle
      placeholder={placeholder}
      value={props.value} // Đổi valueInput thành value
      {...rests}
      onChange={handleonchangeInput}
    />
  );
};


export default InputForm;

// export default InputForm;

// import React from "react";
// import { WrapperInputStyle } from "./style";

// const InputForm = (props) => {
//   const { placeholder = "Nhập chữ vào", onChange, ...rests } = props;

 

//   return (
//     <>
//       <WrapperInputStyle
//         placeholder={placeholder}
//         value={props.value}
//         {...rests}
//         onChange={handleonchangeInput}
//       />
//     </>
//   );
// };

// export default InputForm;
