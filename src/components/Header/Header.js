import React from "react";
import styled from "styled-components";
import BoldFont from "../BoldFont";

const Container = styled(BoldFont)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "64px",
  justifyContent: "center",
  fontSize: "3rem",
  color: (props) => props.theme.colors.textDefault,
  borderBottom: (props) => `1px solid ${props.theme.colors.borderDefault}`,
});

const Header = () => {
  return <Container fontFamily={"Rajdhani"}>Absence Manager</Container>;
};

export default Header;
