import React from "react";
import styled from "styled-components";
import SemiBoldFont from "../../../SemiBoldFont";
import MediumFont from "../../../MediumFont";
import format from "date-fns/format";

const statusToColorMap = {
  Requested: "textWarning",
  Confirmed: "textSuccess",
  Rejected: "textCritical",
};
const statusToBgColorMap = {
  Requested: "surfaceYellow",
  Confirmed: "surfaceGreen",
  Rejected: "surfacePeach",
};

const getAbsenceStatus = ({ absence }) => {
  const { confirmedAt, rejectedAt } = absence;
  if (confirmedAt) {
    return "Confirmed";
  }
  if (rejectedAt) {
    return "Rejected";
  }
  return "Requested";
};

const getAbsencePeriodDateString = ({ absence }) => {
  const startDate = new Date(absence.startDate);
  const formattedStartDate = format(startDate, "do MMM, yy");
  const endDate = new Date(absence.endDate);
  const formattedEndDate = format(endDate, "do MMM, yy");
  return `${formattedStartDate} - ${formattedEndDate}`;
};

const Container = styled.div({
  display: " flex",
  background: (props) => props.theme.colors.white,
  padding: "16px 12px",
  borderRadius: "0px 4px 4px 0px / 0px 4px 4px 0px",
  "&:hover": {
    transform: "translateX(-3px)",
  },
  transition: "all 0.2s ease-in-out",
  borderLeft: (props) =>
    `3px solid ${props.theme.colors[statusToColorMap[props.status]]}`,
  boxShadow: "1px 2px 15px -6px rgba(0, 0, 0, 0.1)",
  columnGap: "16px",
  alignItems: "flex-start",
});
const InfoContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  rowGap: "8px",
  flex: 1,
});
const UserImageContainer = styled.div({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: (props) => `url(${props.src})`,
});
const TopContainer = styled.div({
  display: "flex",
});
const BottomContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const MemberName = styled(SemiBoldFont)({
  fontSize: "1.6rem",
  flex: 1,
});
const AnsencesType = styled.div({
  padding: "4px",
  color: (props) => props.theme.colors.textSubtle,
  background: (props) => props.theme.colors.surfaceGray,
  borderRadius: "2px",
  textTransform: "capitalize",
  fontSize: "1.2rem",
});
const NoteContainer = styled.div({
  display: "flex",
  fontSize: "1.4rem",
  color: (props) => props.theme.colors.textSubtle,
  columnGap: "4px",
});
const Key = styled(MediumFont)({
  width: "auto",
});
const AbsenceStatus = styled(MediumFont)({
  fontSize: "1.2rem",
  color: (props) => props.theme.colors[statusToColorMap[props.status]],
  background: (props) => props.theme.colors[statusToBgColorMap[props.status]],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "2px",
  padding: "0.2em 0.5em",
});
const PeriodContainer = styled.div({
  fontSize: "1.4rem",
});

const AbsenceItem = (props) => {
  const { absence, member } = props;
  const absenceStatus = getAbsenceStatus({ absence });

  return (
    <Container status={absenceStatus}>
      <UserImageContainer src={member.image} />
      <InfoContainer>
        <TopContainer>
          <MemberName>{member.name}</MemberName>
          <AbsenceStatus status={absenceStatus}>{absenceStatus}</AbsenceStatus>
        </TopContainer>
        {absence.memberNote && (
          <NoteContainer>
            <Key>Member Note: </Key>
            <div>{absence.memberNote}</div>
          </NoteContainer>
        )}
        {absence.admitterNote && (
          <NoteContainer>
            <Key>Admitter Note: </Key>
            <div>{absence.admitterNote}</div>
          </NoteContainer>
        )}
        <BottomContainer>
          <AnsencesType>{absence.type}</AnsencesType>
          <PeriodContainer>
            {getAbsencePeriodDateString({ absence })}
          </PeriodContainer>
        </BottomContainer>
      </InfoContainer>
    </Container>
  );
};

export default AbsenceItem;
