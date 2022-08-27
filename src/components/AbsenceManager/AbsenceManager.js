import React from "react";
import styled from "styled-components";
import Header from "../Header";
import AbsenceManagerBody from "../AbsenceManagerBody";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
});

const AbsenceManager = () => {
  return (
    <Container>
      <Header />
      <AbsenceManagerBody />
    </Container>
  );
};

export default AbsenceManager;
