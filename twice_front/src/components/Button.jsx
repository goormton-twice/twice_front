import React from "react";

const Button = ({ style, children, ...props }) => {
  return (
    <button
      style={{
        backgroundColor: 'white',
        height: "18px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        color: 'black',
        border: '1px solid black',
        margin: "0",
        padding: '1px 10px',
        borderRadius: '20px',
        ...style // 사용자 정의 style 덮어쓰기 가능
      }}
      {...props} // 나머지 props (onClick 등)
    >
      {children}
    </button>
  );
};

export default Button;