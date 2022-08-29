import React from "react";
import styled from "styled-components";
import AbsenceManager from "./components/AbsenceManager";

const MainContainer = styled.div({
  width: "100vw",
  height: "100vh",
  background: (props) => props.theme.colors.surfaceGray,
});

const App = () => {
  return (
    <MainContainer>
      <AbsenceManager />
    </MainContainer>
  );
};

export default App;
