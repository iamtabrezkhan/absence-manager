import { API_BASE_URL } from "../config";

export const fetchAbsencesData = async ({
  page = 1,
  limit = 10,
  type = "all",
} = {}) => {
  let url = `${API_BASE_URL}/absences?_page=${page}&_limit=${limit}`;
  if (type !== "all") {
    url += `&type=${type}`;
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
