const Category = (props) => {
  return (
    <button style={{ width:"maxContent", height: "maxContent", border:"1px solid #878787", display:"flex", padding:"5px 5px", borderRadius:"30%" }} >
      <div>{props.detail}</div>
      <div>#{props.tag}</div>
    </button>
  );  
}

export default Category;