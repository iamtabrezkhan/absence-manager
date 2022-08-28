import { API_BASE_URL } from "../config";

export const fetchMembersData = async () => {
  return fetch(`${API_BASE_URL}/members`).then((res) => res.json());
};
