import styled from "styled-components";

const BoldFont = styled.div({
  fontWeight: 700,
  fontFamily: (props) => props.fontFamily || "Figtree",
});

export default BoldFont;
