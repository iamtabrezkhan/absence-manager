import React from "react";
import styled, { css, keyframes } from "styled-components";

const rotateKeyframes = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Container = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const LoaderIcon = styled.div({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  border: `5px solid`,
  borderColor: (props) =>
    `transparent ${props.theme.colors.decorativeBlue} transparent ${props.theme.colors.decorativeBlue}`,
  animation: css`
    ${rotateKeyframes} 1s linear infinite
  `,
});

const Loader = () => {
  return (
    <Container>
      <LoaderIcon />
    </Container>
  );
};

export default Loader;
