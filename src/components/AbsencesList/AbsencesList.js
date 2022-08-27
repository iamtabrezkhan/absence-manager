import React, { useEffect } from "react";
import { fetchAbsencesData } from "../../http/absences";
import { useDispatch, useSelector } from "react-redux";
import { setAbsences, setTotalAbsencesCount } from "../../redux/appSlice";

const AbsencesList = () => {
  const absences = useSelector((state) => state?.app.absences);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAbsences();
  }, []);

  const fetchAbsences = async () => {
    const { data, totalCount } = await fetchAbsencesData();
    dispatch(setAbsences(data));
    dispatch(setTotalAbsencesCount(totalCount));
  };

  return (
    <div>
      {absences.map((item) => (
        <div key={item.id}>{item.id}</div>
      ))}
    </div>
  );
};

export default AbsencesList;
