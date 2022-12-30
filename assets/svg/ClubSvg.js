import Svg, { Path } from "react-native-svg";
//import liraries
import React, { Component } from "react";

// create a component
const ClubSvg = () => {
  return (
    <Svg
      width={23}
      height={26}
      viewBox="0 0 17 20"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.88533 0.10169L1.24174 2.37005C0.497965 2.62306 0 3.30545 0 4.07198V10.7097C0 12.7315 0.752904 14.6789 2.10912 16.196C2.74795 16.9121 3.56192 17.5077 4.54931 18.0259L8.14662 19.9118C8.37107 20.0295 8.64142 20.0294 8.86582 19.9116L12.4568 18.0269C13.4415 17.5095 14.2555 16.9127 14.8944 16.1964C16.2486 14.6804 17 12.7342 17 10.7136V4.07198C17 3.30545 16.502 2.62306 15.7574 2.36977L9.11563 0.102016C8.718 -0.0339509 8.28371 -0.0339509 7.88533 0.10169ZM8.61306 1.48951L15.2563 3.75777C15.3945 3.80477 15.4861 3.9303 15.4861 4.07198V10.7136C15.4861 12.3792 14.8668 13.9832 13.7508 15.2327L13.5525 15.4427C13.0722 15.9246 12.4672 16.3492 11.7369 16.7329L8.50505 18.4283L5.26848 16.7316C4.4313 16.2922 3.76044 15.8013 3.25256 15.232C2.13446 13.9813 1.51389 12.3761 1.51389 10.7097V4.07198C1.51389 3.9303 1.6055 3.80477 1.74283 3.75805L8.38661 1.48962C8.45994 1.46466 8.54038 1.46466 8.61306 1.48951ZM12.2553 7.2399C11.9597 6.95269 11.4804 6.95269 11.1848 7.2399L7.78544 10.5422L6.41181 9.20616L6.32693 9.13493C6.03066 8.92122 5.61013 8.94485 5.34132 9.20588C5.04564 9.49302 5.04551 9.95869 5.34104 10.246L7.25056 12.1023L7.33546 12.1735C7.63179 12.3872 8.05241 12.3636 8.32119 12.1024L12.2553 8.27999L12.3286 8.19751C12.5485 7.90959 12.524 7.501 12.2553 7.2399Z"
        fill="#676767"
      />
    </Svg>
  );
};

export default ClubSvg;
