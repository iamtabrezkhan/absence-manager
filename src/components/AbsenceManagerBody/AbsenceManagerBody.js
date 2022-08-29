import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchMembersData } from "../../http/members";
import { setMembers } from "../../redux/appSlice";
import AbsencesList from "../AbsencesList";
import Loader from "../Loader";

const Container = styled.div({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

const InnerContainer = styled.div({
  width: "100%",
  flex: 1,
  maxWidth: "768px",
  margin: "0 auto",
});

const AbsenceManagerBody = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    initMembersData();
  }, []);

  const initMembersData = async () => {
    try {
      const membersList = await fetchMembersData();
      const membersGroupedById = membersList.reduce((result, member) => {
        return { ...result, [member.userId]: member };
      }, {});
      dispatch(setMembers(membersGroupedById));
    } catch (error) {
      dispatch(setMembers({}));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <InnerContainer>
        <AbsencesList />
      </InnerContainer>
    </Container>
  );
};

export default AbsenceManagerBody;
