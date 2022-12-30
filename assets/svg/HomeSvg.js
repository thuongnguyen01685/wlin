import Svg, { Path } from "react-native-svg";
//import liraries
import React, { Component } from "react";

// create a component
const HomeSvg = (props) => {
  return (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 21 22"
      fill={props.focused ? "#9D85F2" : "none"}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d={
          "M7.65722 19.7714V16.7047C7.6572 15.9246 8.29312 15.2908 9.08101 15.2856H11.9671C12.7587 15.2856 13.4005 15.9209 13.4005 16.7047V16.7047V19.7809C13.4003 20.4432 13.9343 20.9845 14.603 21H16.5271C18.4451 21 20 19.4607 20 17.5618V17.5618V8.83784C19.9898 8.09083 19.6355 7.38935 19.038 6.93303L12.4577 1.6853C11.3049 0.771566 9.6662 0.771566 8.51342 1.6853L1.96203 6.94256C1.36226 7.39702 1.00739 8.09967 1 8.84736V17.5618C1 19.4607 2.55488 21 4.47291 21H6.39696C7.08235 21 7.63797 20.4499 7.63797 19.7714V19.7714"
        }
        stroke={props.focused ? "#9D85F2" : "#676767"}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HomeSvg;
