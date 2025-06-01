const Category = (props) => {
  return (
    <button id={props.id} style={{  border:"1.5px solid #878787", backgroundColor:"white", display:"flex", gap:"10px", padding:"11px", borderRadius:"18px",alignItems:"center", fontWeight:"500", height:"38px", margin:"10px 0",...props.style }} onClick={props.onClick}>
      <div>{props.detail}</div>
      <div>#{props.tag}</div>
    </button>
  );  
}

export default Category;