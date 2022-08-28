import React, { useEffect, useState } from "react";
import { fetchAbsencesData } from "../../http/absences";
import { fetchMembersData } from "../../http/members";
import { useDispatch, useSelector } from "react-redux";
import {
  setAbsences,
  setMembers,
  setTotalAbsencesCount,
} from "../../redux/appSlice";
import AbsenceItem from "./components/AbsenceItem";
import styled from "styled-components";
import Loader from "../Loader";
import { PAGE_LIMIT } from "../../config";

const Container = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "8px",
  paddingBottom: "16px",
});

const AbsencesList = () => {
  const [loading, setLoading] = useState(true);
  const absences = useSelector((state) => state?.app.absences);
  const membersById = useSelector((state) => state?.app.membersById);
  const selectedAbsenceType = useSelector(
    (state) => state.app.selectedAbsenceType
  );
  const currentPage = useSelector((state) => state.app.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAbsences();
  }, [selectedAbsenceType, currentPage]);

  const fetchAbsences = async () => {
    setLoading(true);
    try {
      const { data, totalCount } = await fetchAbsencesData({
        type: selectedAbsenceType,
        page: currentPage,
        limit: PAGE_LIMIT,
      });
      const membersList = await fetchMembersData();
      const membersGroupedById = membersList.reduce((result, member) => {
        return { ...result, [member.userId]: member };
      }, {});
      dispatch(setMembers(membersGroupedById));
      dispatch(setAbsences(data));
      dispatch(setTotalAbsencesCount(totalCount));
    } catch (error) {
      dispatch(setMembers({}));
      dispatch(setAbsences([]));
      dispatch(setTotalAbsencesCount(0));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {absences.map((absence) => (
            <AbsenceItem
              key={absence.id}
              absence={absence}
              member={membersById[absence.userId]}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export default AbsencesList;
