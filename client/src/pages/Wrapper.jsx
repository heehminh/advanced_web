import React, { useState } from "react";
import Type from "../components/Home/blocks/Type";
import Content from "../components/Home/blocks/Content";

export const Wrapper = () => {
  const [click, setClick] = useState(false);
  const button_content = ["지도 표시하기 🗺️", "목록 보기 🗒️"];
  const [button, setButton] = useState(button_content[0]);

  const changeContent = () => {
    setClick(!click);
    click ? setButton(button_content[0]) : setButton(button_content[1]);
  };

  const [typeIndex, setTypeIndex] = useState(0);

  return (
    <div>
      <Type setTypeIndex={setTypeIndex} setClick={setClick} />
      <Content click={click} typeIndex={typeIndex} />

      <button id="button__map" onClick={changeContent}>
        {button}
      </button>
    </div>
  );
};

export default Wrapper;
