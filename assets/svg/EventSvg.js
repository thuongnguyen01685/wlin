import Svg, { Path } from "react-native-svg";
//import liraries
import React, { Component } from "react";

// create a component
const IconEvent = [
  "M1.59253 8.40421H19.4165",
  "M14.942 12.3097H14.9512",
  "M10.5047 12.3097H10.514",
  "M6.05793 12.3097H6.0672",
  "M14.942 16.1962H14.9512",
  "M10.5047 16.1962H10.514",
  "M6.05793 16.1962H6.0672",
  "M14.5438 1V4.29078",
  "M6.4654 1V4.29078",
  "M14.7383 2.5791H6.27096C3.33427 2.5791 1.5 4.21504 1.5 7.22213V16.2718C1.5 19.3261 3.33427 20.9999 6.27096 20.9999H14.729C17.675 20.9999 19.5 19.3545 19.5 16.3474V7.22213C19.5092 4.21504 17.6842 2.5791 14.7383 2.5791Z",
];
const EventSvg = () => {
  return (
    <Svg
      width={25}
      height={26}
      fill={"none"}
      viewBox="0 0 21 22"
      xmlns="http://www.w3.org/2000/svg">
      {IconEvent.map((i, index) => (
        <Path
          d={`${i}`}
          stroke={"#676767"}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          key={index}
        />
      ))}
    </Svg>
  );
};

export default EventSvg;
