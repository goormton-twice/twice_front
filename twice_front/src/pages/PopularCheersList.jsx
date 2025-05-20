import StoryInput from '../components/StoryInput';


const PopularCheersList = () => {

  return (
    <div style={{ width:"70vw", height:"100vh", display: "flex", alignContent: "center", flexDirection: "column", padding:"20px 25px", gap:"20px" }}>
      <div style = {{fontWeight:'900', fontSize:'1.5em'}}>인기 응원함</div>
      <StoryInput hasTags ={true} hasLikes={true} />
    </div> 
  );
}

export default PopularCheersList;