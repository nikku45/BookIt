import { api } from "./config";

export const getExperiences = async () => {
  const response = await api.get("/experiences");
  return response.data;
};

export const getExperienceById = async (id: string) => {
  const response = await api.get(`/experiences/${id}`);
  return response.data;
};
