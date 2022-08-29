import React from "react";
import styled from "styled-components";
import Select from "react-select";
import MediumFont from "../MediumFont";
import Paginator from "../Paginator";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedAbsenceType,
  setCurrentPage,
  setSelectedPeriodRange,
} from "../../redux/appSlice";
import { PAGE_LIMIT } from "../../config";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

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

const StyledDateRangePicker = styled(DateRangePicker)({
  background: (props) => props.theme.colors.white,
  border: (props) => `1px solid ${props.theme.colors.borderHover}`,
  ".react-daterange-picker__wrapper": {
    border: "none",
  },
  padding: "4px",
  borderRadius: "4px",
  "input:focus": {
    outline: "none",
  },
  ".react-daterange-picker__calendar .react-calendar": {
    border: (props) => `1px solid ${props.theme.colors.borderHover}`,
    borderRadius: "4px",
  },
  ".react-daterange-picker__calendar": {
    width: "330px",
  },
  ".react-calendar__tile--hasActive": {
    background: (props) => props.theme.colors.decorativeBlueDark,
    color: (props) => props.theme.colors.white,
  },
});

const FilterHeader = () => {
  const selectedAbsenceType = useSelector(
    (state) => state.app.selectedAbsenceType
  );
  const totalCount = useSelector((state) => state.app.totalAbsencesCount);
  const selectedPeriodRange = useSelector(
    (state) => state.app.selectedPeriodRange
  );
  const selectedAbsenceOption = absenceTypeOptions.find(
    (item) => item.value === selectedAbsenceType
  );
  const dispatch = useDispatch();

  const handleDropdownChange = (e) => {
    const { value } = e;
    dispatch(setSelectedAbsenceType(value));
    dispatch(setCurrentPage(1));
  };

  const handleDateRangeChange = (value) => {
    dispatch(setCurrentPage(1));
    dispatch(setSelectedPeriodRange(value));
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
        <DropdownContainer>
          <Label>Period: </Label>
          <StyledDateRangePicker
            onChange={handleDateRangeChange}
            value={selectedPeriodRange}
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
