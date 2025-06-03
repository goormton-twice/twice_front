import React from "react";

const Rock = (props) => {
  return (
    <svg width="71" height="67" viewBox="0 0 71 67" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={props.onClick} {...props}>
<rect x="0.5" width="70" height="67" rx="33.5" fill="#B48CFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M42.5469 27.8848H28.4531V24.9006C28.4605 23.001 29.1985 21.2158 30.5339 19.8764C31.8619 18.5444 33.6171 17.812 35.4889 17.812H35.5185C39.3952 17.812 42.5469 21.006 42.5469 24.9324V27.8848ZM33.8539 43.4277H36.6282V36.4571H33.8539V43.4277ZM45.3212 27.8848V24.9324C45.3212 19.4567 40.9229 15.002 35.524 15.002C32.9291 14.9477 30.4414 16.0136 28.5826 17.8794C26.7201 19.7471 25.6899 22.2367 25.6788 24.9324V27.8848H20.5V52H50.5V27.8848H45.3212Z" fill="white"/>
</svg>


  );
};
export default Rock;
