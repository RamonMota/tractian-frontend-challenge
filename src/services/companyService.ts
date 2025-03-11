import { api } from "./api";

export type Company = {
  id: number;
  name: string;
};

export type CompanyLocation = {
  id: string;
  name: string;
  parentId: number | string;
  children?: CompanyLocation[];
};

export type Asset = {
  id?: string;
  name?: string;
  parentId?: string | null;
  sensorId?: string | null;
  sensorType?: string | null;
  status?: string | null;
  gatewayId?: string;
  locationId?: string;
  children?: Asset[]
};

export const getCompanies = async (): Promise<Company[]> => {
  const response = await api.get("/companies");
  return response.data;
};

export const getCompanyLocations = async (
  companyId: number | string
): Promise<CompanyLocation[]> => {
  const response = await api.get(`/companies/${companyId}/locations`);
  return response.data;
};

export const getCompanyAssets = async (
  companyId: number | string
): Promise<Asset[]> => {
  const response = await api.get(`/companies/${companyId}/assets`);
  return response.data;
};
