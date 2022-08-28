import React from "react";
import styled from "styled-components";
import Select from "react-select";
import MediumFont from "../MediumFont";

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  maxWidth: "768px",
  margin: "0 auto",
  width: "100%",
  padding: "12px 0",
});

const absenceTypeOptions = [
  { value: "all", label: "All" },
  { value: "vacation", label: "Vacation" },
  { value: "sickness", label: "Sickness" },
];

const LeftContainer = styled.div({
  display: "flex",
  columnGap: "8px",
  alignItems: "center",
});

const DropdownContainer = styled.div({
  fontSize: "1.4rem",
  display: "flex",
  columnGap: "8px",
  alignItems: "center",
});

const Dropdown = styled(Select)({
  width: "110px",
});

const Label = styled(MediumFont)({
  width: "auto",
});

const FilterHeader = () => {
  const handleDropdownChange = (value) => {
    console.log(value);
  };

  return (
    <Container>
      <LeftContainer>
        <DropdownContainer>
          <Label>Type: </Label>
          <Dropdown
            options={absenceTypeOptions}
            isSearchable={false}
            value={absenceTypeOptions[0]}
            onChange={handleDropdownChange}
            isMulti={false}
            components={{
              IndicatorsContainer: () => null,
            }}
          />
        </DropdownContainer>
      </LeftContainer>
    </Container>
  );
};

export default FilterHeader;
