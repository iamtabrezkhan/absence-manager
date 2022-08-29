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
    const [startRange, endRange] = formattedPeriodRange;
    url += `&startDate_gte=${startRange}&startDate_lte=${endRange}&endDate_gte=${startRange}&endDate_lte=${endRange}`;
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
