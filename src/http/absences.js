import { API_BASE_URL } from "../config";

export const fetchAbsencesData = async ({ page = 1, limit = 10 } = {}) => {
  return fetch(`${API_BASE_URL}/absences?_page=${page}&_limit=${limit}`).then(
    async (res) => {
      const data = await res.json();
      const totalCount = parseInt(res.headers.get("x-total-count"));
      return {
        totalCount,
        data,
      };
    }
  );
};
