import styled from "styled-components";

const SemiBoldFont = styled.div({
  fontWeight: 600,
  fontFamily: (props) => props.fontFamily || "Figtree",
});

export default SemiBoldFont;
