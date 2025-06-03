import React from 'react';

const Category = (props) => {
  return (
    <button id={props.id} style={{color:"black",  border:"1.5px solid #878787", backgroundColor:"white", display:"flex", gap:"10px", padding:"15px 20px", borderRadius:"25px",alignItems:"center",maxWidth:"400px", height:"60px",cursor:"pointer",fontWeight:"600", fontSize:"16px", fontWeight:"500", lineHeight:"20px", margin:"10px 0",...props.style }} onClick={props.onClick}>
      <div>{props.detail}</div>
      <div>#{props.tag}</div>
    </button>
  );  
}

export default Category;