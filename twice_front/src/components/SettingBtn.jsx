import { useState } from 'react';
import React from 'react';
import Setting from './Setting';
import Share from './share';
import Report from './Report';
import Edit from './Edit';
const SettingBtn = ({isYourPage=false}) => {
    const [isClicked, setIsClicked] = useState(false);
  return (
    <div style={{ position: "relative"}}>
      <Setting onClick={() => setIsClicked(!isClicked)}>
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
            </div>
  );
}

export default SettingBtn;