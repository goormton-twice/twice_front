import React, { useState } from "react";
import Bookmark from "./bookmark";
import Button from "./Button";
import Likes from "./Likes";
import "./StoryInput.css";
import SettingBtn from './SettingBtn';
import Profile from './profile';
import Setting from './Setting';
const StoryInput = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isYourPage, setIsYourPage] = useState(false);

  const {
    Tag = null,
    hasLikes = 0,
    style = {},
    nickname = "default",
    date = "?",
    hasBookmark = false,
    url = null,
    icons = null,
    children = null,
    onClick = () => {},
  } = props;
  return (
    <div id="outline" style={{position: "relative" , ...style}} onClick={onClick}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="div-flex"
          style={{ width:"100%", gap: "5px",justifyContent:"space-between", fontSize: "14px"}}
        >
          <div className="div-flex" style={{ width:"80%", alignItems:"center", gap: "10px" }}>
            {url ? <img src={url} />:<Profile stroke = "rgba(152, 108, 233, 1)" fill = "rgba(247, 243, 255, 1)" />}
            <div>{nickname}</div>
            <div>{date}</div>
          </div>
          {icons}
        </div>
        {Tag && <Button disabled>{Tag}</Button>}
      </div>

      <div
        style={{
          fontWeight: "normal",
          fontSize: "0.9em",
          marginBottom: "10px",
        }}
      >
        {children}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {hasLikes >= 0 && (
          <div className="div-flex" style={{ gap: "5px", fontSize: "14px" }}>
            <div>
              <Likes
                style={{ width: "25px" }}
                stroke="rgba(152, 108, 233, 1)"
              />
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
