import styled from "styled-components";

const MediumFont = styled.div({
  fontWeight: 500,
  fontFamily: (props) => props.fontFamily || "Figtree",
});

export default MediumFont;
