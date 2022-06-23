import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const ProgresMainWrapper = styled.div`
  font-size: 18px;
  margin: 0 0 20px 0;
  overflow: hidden;
  color: #5e6062;
`;

const Progress = styled.div`
  display: block;
  width: 100%;
  background-color: #ddd;
  height: 18px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 5px 0 0;
`;

const ProgressDone = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 0;
  opacity: 0;
  transition: 0.8s ease 0.3s;
  background-color: #72b239;
`;

const Indicator = ({ done }) => {
  const [style, setStyle] = useState({});

  const data = ["Crea tu perfil"];

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`,
      };

      setStyle(newStyle);
    }, 200);
  });

  return (
    <ProgresMainWrapper>
      {data.map((item) => (
        <>
          <span>{item}</span>
          <span> - </span>
          <span> Paso 1 de 4</span>
        </>
      ))}
      <Progress>
        <ProgressDone style={style}></ProgressDone>
      </Progress>
    </ProgresMainWrapper>
  );
};

export default Indicator;
