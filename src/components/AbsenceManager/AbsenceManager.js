import React from "react";
import styled from "styled-components";
import Header from "../Header";
import AbsenceManagerBody from "../AbsenceManagerBody";
import FilterHeader from "../FilterHeader";

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
      <FilterHeader />
      <AbsenceManagerBody />
    </Container>
  );
};

export default AbsenceManager;
