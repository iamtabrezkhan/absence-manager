import styled from "styled-components";

const RegularFont = styled.div({
  fontWeight: 400,
  fontFamily: (props) => props.fontFamily || "'Rajdhani', sans-serif",
});

export default RegularFont;
