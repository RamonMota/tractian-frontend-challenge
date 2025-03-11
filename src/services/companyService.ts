import { api } from "./api";

export interface ICompany {
  id: string;
  name: string;
};

export interface CompanyLocation {
  id: string;
  name: string;
  parentId: number | string;
  children?: CompanyLocation[];
};

export interface Asset {
  id?: string | null;
  name?: string | null;
  parentId?: string | null;
  sensorId?: string | null;
  sensorType?: string | null;
  status?: string | null;
  gatewayId?: string;
  locationId?: string;
  children?: Asset[] | null
};


export const getCompanies = async (): Promise<ICompany[]> => {
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
