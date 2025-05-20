import Button from "./Button";
import Likes from "./likes";
import "./StoryInput.css";
const StoryInput = () => {
  return (
    <div id = "outline">
      <div className='div-flex'>
        <Button disabled={true}>HOT</Button>
        <Button disabled={true}>위로</Button>
      </div>
      <div className='div-flex' style={{marginLeft:"5px"}}>
        <img src="../src/assets/react.svg" />
        <div>닉네임</div>
        <div>05.16</div>
      </div>
      <div className='div-flex' style={{justifyContent: "space-between", marginLeft:"5px"}}>
        <div style={{fontWeight:'bold', fontSize:'1.1em'}}>사연 내용</div>
        <div className='div-flex'>
          <div>
            <Likes />
          </div>
          <div>3</div>
        </div>
      </div>
    </div>
  );
};

export default StoryInput;
