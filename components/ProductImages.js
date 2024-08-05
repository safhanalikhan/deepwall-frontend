import styled from "styled-components";
import { useState, useEffect } from "react";

const BigImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  // max-height: 200px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
  overflow: hidden;
`;

export default function ProductImages({ images, activeImage }) {
  const [activeImg, setActiveImg] = useState(images?.[0]);
  useEffect(() => {
    setActiveImg(activeImage);
  }, [activeImage]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImg} />
      </BigImageWrapper>
    </>
  );
}
