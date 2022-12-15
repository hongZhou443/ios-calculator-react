import React from "react";
import { Textfit } from "react-textfit";

function Screen(props){
  return (
    <Textfit className="screen" mode="single" max={70}>
      {props.val}
    </Textfit>
  );
};

export default Screen;