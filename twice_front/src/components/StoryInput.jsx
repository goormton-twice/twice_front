import React from "react";
import Bookmark from "./Bookmark";
import Button from "./Button";
import Likes from "./Likes";
import "./StoryInput.css";
const StoryInput = (props) => {
  const {
    Tag= null,
    hasLikes = 0,
    style = {},
    nickname = "닉네임",
    date = "5.16",
    url= "../src/assets/react.svg",
    hasBookmark = false,
    children = null
  } = props;
  return (
    <div id="outline" style={style}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
        <div className="div-flex" style={{ gap: "5px", alignItems: "center", fontSize: "14px" }}>
          <img src={url}/>
          <div>{nickname}</div>
          <div>{date}</div>
        </div>
        {Tag && <Button disabled>{Tag}</Button>}
      </div>

      <div style={{ fontWeight: "normal", fontSize: "0.9em", marginBottom:"10px" }}>{children}</div>
      <div style={{ display: "flex", width:"100%", justifyContent: "space-between" }}>
        {hasLikes >= 0 && (
          <div className="div-flex" style={{ gap: "5px", fontSize: "14px"  }}>
            <div>
              <Likes style={{width:"25px"}} stroke="rgba(152, 108, 233, 1)" />
            </div>
            <div>응원</div>
            <div>{hasLikes}</div>
          </div>
        )}
        {hasBookmark && <Bookmark stroke="rgba(152, 108, 233, 1)" />}
      </div>
    </div>
  );
};

export default StoryInput;
