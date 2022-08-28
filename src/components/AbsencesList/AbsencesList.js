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

const Container = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  rowGap: "8px",
  padding: "16px 0",
});

const AbsencesList = () => {
  const [loading, setLoading] = useState(true);
  const absences = useSelector((state) => state?.app.absences);
  const membersById = useSelector((state) => state?.app.membersById);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAbsences();
  }, []);

  const fetchAbsences = async () => {
    try {
      const { data, totalCount } = await fetchAbsencesData();
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
