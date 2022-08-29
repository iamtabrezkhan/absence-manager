import { format } from "date-fns";
import { API_BASE_URL } from "../config";

export const fetchAbsencesData = async ({
  page = 1,
  limit = 10,
  type = "all",
  periodRange,
} = {}) => {
  let url = `${API_BASE_URL}/absences?_page=${page}&_limit=${limit}`;
  if (type !== "all") {
    url += `&type=${type}`;
  }
  if (periodRange?.length === 2) {
    const formattedPeriodRange = periodRange.map((date) =>
      format(date, "yyyy-MM-dd")
    );
    url += `&startDate_gte=${formattedPeriodRange[0]}&startDate_lte=${formattedPeriodRange[1]}&endDate_gte=${formattedPeriodRange[0]}&endDate_lte=${formattedPeriodRange[1]}`;
  }
  return fetch(url).then(async (res) => {
    const data = await res.json();
    const totalCount = parseInt(res.headers.get("x-total-count"));
    return {
      totalCount,
      data,
    };
  });
};
