import React, { useState } from "react";
import Bookmark from "./Bookmark";
import Button from "./Button";
import Likes from "./Likes";
import "./StoryInput.css";
import Setting from './Setting';
import Report from './Report';
import { Edit, Share } from 'lucide-react';
const StoryInput = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isYourPage, setIsYourPage] = useState(false);

  const {
    Tag = null,
    hasLikes = 0,
    style = {},
    nickname = "닉네임",
    date = "5.16",
    hasSettings = false,
    url = "../src/assets/react.svg",
    hasBookmark = false,
    children = null,
  } = props;
  return (
    <div id="outline" style={style}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="div-flex"
          style={{ width:"100%", gap: "5px",justifyContent:"space-between", fontSize: "14px" }}
        >
          <div className="div-flex" style={{ width:"80%", alignItems:"center", gap: "10px" }}>
            <img src={url} />
            <div>{nickname}</div>
            <div>{date}</div>
          </div>
          {hasSettings && (
            <Setting
              onClick={() => setIsClicked(!isClicked)}
              style={{ width: "20px" }}
            >
              {isClicked && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: "20px",
                    width: "150px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {isYourPage ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                      }}
                    >
                      <div value="edit">수정하기</div>
                      <Edit />
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                      }}
                    >
                      <div value="report">신고하기</div>
                      <Report />
                    </div>
                  )}
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#8080808C",
                      height: "1px",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div value="share">공유하기</div>
                    <Share />
                  </div>
                </div>
              )}
            </Setting>
          )}
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