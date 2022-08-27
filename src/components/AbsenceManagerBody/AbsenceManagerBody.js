import React from "react";
import styled from "styled-components";
import AbsencesList from "../AbsencesList";

const Container = styled.div({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const InnerContainer = styled.div({
  width: "100%",
  flex: 1,
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
