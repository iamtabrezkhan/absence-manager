import React from "react";
import styled from "styled-components";
import Select from "react-select";
import MediumFont from "../MediumFont";
import Paginator from "../Paginator";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAbsenceType, setCurrentPage } from "../../redux/appSlice";
import { PAGE_LIMIT } from "../../config";

const absenceTypeOptions = [
  { value: "all", label: "All" },
  { value: "vacation", label: "Vacation" },
  { value: "sickness", label: "Sickness" },
];

const Container = styled.div({
  display: "flex",
  alignItems: "center",
  maxWidth: "768px",
  margin: "0 auto",
  width: "100%",
  padding: "12px 0",
  justifyContent: "space-between",
});

const LeftContainer = styled.div({
  display: "flex",
  columnGap: "8px",
  alignItems: "center",
});

const RightContainer = styled.div({
  display: "flex",
  alignItems: "center",
  columnGap: "8px",
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

const TotalContainer = styled.div({
  fontSize: "1.4rem",
  display: "flex",
  alignItems: "center",
  columnGap: "4px",
});

const FilterHeader = () => {
  const selectedAbsenceType = useSelector(
    (state) => state.app.selectedAbsenceType
  );
  const totalCount = useSelector((state) => state.app.totalAbsencesCount);
  const selectedAbsenceOption = absenceTypeOptions.find(
    (item) => item.value === selectedAbsenceType
  );
  const dispatch = useDispatch();

  const handleDropdownChange = (e) => {
    const { value } = e;
    dispatch(setSelectedAbsenceType(value));
    dispatch(setCurrentPage(1));
  };

  return (
    <Container>
      <LeftContainer>
        <DropdownContainer>
          <Label>Type: </Label>
          <Dropdown
            options={absenceTypeOptions}
            isSearchable={false}
            value={selectedAbsenceOption}
            onChange={handleDropdownChange}
            isMulti={false}
            components={{
              IndicatorsContainer: () => null,
            }}
          />
        </DropdownContainer>
      </LeftContainer>
      <RightContainer>
        <TotalContainer>
          <Label>Total absences:</Label>
          <div>{totalCount}</div>
        </TotalContainer>
        <Paginator totalCount={totalCount} pageSize={PAGE_LIMIT} />
      </RightContainer>
    </Container>
  );
};

export default FilterHeader;
