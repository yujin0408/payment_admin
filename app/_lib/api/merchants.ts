import { fetcher } from "./fetcher";

/* type */

export type Merchant = {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
};

export type MerchantDetail = {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
};

export type MerchantListResponse = {
  status: number;
  message: string;
  data: Merchant[];
};

export type MerchantDetailResponse = {
  status: number;
  message: string;
  data: MerchantDetail;
};

/* fetch */
export async function getMerchants(): Promise<MerchantListResponse> {
  return fetcher<MerchantListResponse>("/merchants/list");
}

export async function getMerchantsDetail(): Promise<MerchantDetail[]> {
  const response = await fetcher<{ status: number; message: string; data: MerchantDetail[] }>(
    "/merchants/details"
  );
  return response.data;
}

export async function getMerchantDetail(mchtCode: string): Promise<MerchantDetailResponse> {
  return fetcher<MerchantDetailResponse>(`/merchants/details/${mchtCode}`);
}
