import React from "react";
import styled from "styled-components";
import AbsencesList from "../AbsencesList";

const Container = styled.div({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

const InnerContainer = styled.div({
  width: "100%",
  flex: 1,
  maxWidth: "768px",
  margin: "0 auto",
});

const AbsenceManagerBody = () => {
  return (
    <Container>
      <InnerContainer>
        <AbsencesList />
      </InnerContainer>
    </Container>
  );
};

export default AbsenceManagerBody;
