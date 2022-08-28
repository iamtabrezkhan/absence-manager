import styled from "styled-components";

const RegularFont = styled.div({
  fontWeight: 400,
  fontFamily: (props) => props.fontFamily || "Figtree",
});

export default RegularFont;
