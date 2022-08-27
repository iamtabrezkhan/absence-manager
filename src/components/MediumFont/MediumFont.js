import styled from "styled-components";

const MediumFont = styled.div({
  fontWeight: 500,
  fontFamily: (props) => props.fontFamily || "'Rajdhani', sans-serif",
});

export default MediumFont;
