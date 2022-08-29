import React, { useEffect, useState } from "react";
import { fetchAbsencesData } from "../../http/absences";
import { useDispatch, useSelector } from "react-redux";
import { setAbsences, setTotalAbsencesCount } from "../../redux/appSlice";
import AbsenceItem from "./components/AbsenceItem";
import styled from "styled-components";
import Loader from "../Loader";
import { PAGE_SIZE } from "../../config";
import EmptyFileIcon from "../../svgcomponents/EmptyFileIcon";
import BrokenFileIcon from "../../svgcomponents/BrokenFileIcon";
import SemiBoldFont from "../SemiBoldFont";

const Container = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "8px",
  paddingBottom: "16px",
});

const NoDataContainer = styled(SemiBoldFont)({
  display: "flex",
  width: "100%",
  height: "100%",
  fontSize: "1.6rem",
  alignItems: "center",
  justifyContent: "center",
});
const NoDataInnerContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  fontSize: "1.6rem",
  alignItems: "center",
  rowGap: "8px",
});

const AbsencesList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const absences = useSelector((state) => state?.app.absences);
  const membersById = useSelector((state) => state?.app.membersById);
  const selectedAbsenceType = useSelector(
    (state) => state.app.selectedAbsenceType
  );
  const selectedPeriodRange = useSelector(
    (state) => state.app.selectedPeriodRange
  );
  const currentPage = useSelector((state) => state.app.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAbsences();
  }, [selectedAbsenceType, currentPage, selectedPeriodRange]);

  const fetchAbsences = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, totalCount } = await fetchAbsencesData({
        type: selectedAbsenceType,
        page: currentPage,
        limit: PAGE_SIZE,
        periodRange: selectedPeriodRange,
      });
      dispatch(setAbsences(data));
      dispatch(setTotalAbsencesCount(totalCount));
    } catch (error) {
      dispatch(setAbsences([]));
      dispatch(setTotalAbsencesCount(0));
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <NoDataContainer>
        <NoDataInnerContainer>
          <BrokenFileIcon width={50} height={50} />
          <div>Something went wrong!</div>
        </NoDataInnerContainer>
      </NoDataContainer>
    );
  }

  if (!absences?.length) {
    return (
      <NoDataContainer>
        <NoDataInnerContainer>
          <EmptyFileIcon width={50} height={50} />
          <div>No result found!</div>
        </NoDataInnerContainer>
      </NoDataContainer>
    );
  }

  return (
    <Container>
      {absences.map((absence) => (
        <AbsenceItem
          key={absence.id}
          absence={absence}
          member={membersById[absence.userId]}
        />
      ))}
    </Container>
  );
};

export default AbsencesList;
