import Bookmark from "./bookmark";
import Button from "./Button";
import Likes from "./likes";
import "./StoryInput.css";
const StoryInput = (props) => {
  const {
    Tag= null,
    hasLikes = false,
    style = {},
    hasBookmark = false,
    children = null
  } = props;
  return (
    <div id="outline" style={style}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
        <div className="div-flex" style={{ gap: "5px", alignItems: "center", fontSize: "14px" }}>
          <img src="../src/assets/react.svg" />
          <div>닉네임</div>
          <div>05.16</div>
        </div>
        {Tag && <Button disabled>{Tag}</Button>}
      </div>

      <div style={{ fontWeight: "normal", fontSize: "0.9em", marginBottom:"10px" }}>{children}</div>
      <div style={{ display: "flex", width:"100%", justifyContent: "space-between" }}>
        {hasLikes && (
          <div className="div-flex" style={{ gap: "5px", fontSize: "14px"  }}>
            <div>
              <Likes style={{width:"25px"}} />
            </div>
            <div>응원</div>
            <div>3</div>
          </div>
        )}
        {hasBookmark && <Bookmark />}
      </div>
    </div>
  );
};

export default StoryInput;
