import React from "react";

const PersonalCheerImg = (props) => {
  return (
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.2 12H16.2L14.2 15H10.2L8.19995 12H2.19995M22.2 12V18C22.2 18.5304 21.9892 19.0391 21.6142 19.4142C21.2391 19.7893 20.7304 20 20.2 20H4.19995C3.66952 20 3.16081 19.7893 2.78574 19.4142C2.41066 19.0391 2.19995 18.5304 2.19995 18V12M22.2 12L18.75 5.11C18.5844 4.77679 18.3291 4.49637 18.0129 4.30028C17.6967 4.10419 17.332 4.0002 16.96 4H7.43995C7.06787 4.0002 6.70322 4.10419 6.387 4.30028C6.07078 4.49637 5.81553 4.77679 5.64995 5.11L2.19995 12" stroke={props.stroke || "#808080" }strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


  );
}
export default PersonalCheerImg;