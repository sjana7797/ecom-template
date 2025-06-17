import axios, { AxiosError, Method } from "axios";
import * as HttpStatusCodes from "@repo/utils/http/status-codes";
import * as HttpStatusPhrases from "@repo/utils/http/status-phrases";

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

export type APIResponse<T> =
  | {
      data: T;
      status: number;
      success: true;
      message?: string;
    }
  | {
      data: null;
      status: number;
      success: false;
      message?: string;
    };

type FetcherOptions<T> = {
  params: T;
  url: string;
};
export const fetcher = async <Params, ResponseData>({
  params,
  url,
}: FetcherOptions<Params>): Promise<APIResponse<ResponseData>> => {
  try {
    const response = await client.get<ResponseData>(url, { params });

    return {
      data: response.data,
      status: response.status,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        data: null,
        status: error.response?.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.response?.data?.message,
      };
    }

    return {
      data: null,
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: HttpStatusPhrases.INTERNAL_SERVER_ERROR,
    };
  }
};

type MutatorOptions<RequestBody> = {
  body: RequestBody;
  url: string;
  method?: Method;
};

export const mutator = async <RequestBody, ResponseData>({
  body,
  url,
  method = "POST",
}: MutatorOptions<RequestBody>): Promise<APIResponse<ResponseData>> => {
  try {
    const response = await client<ResponseData>(url, {
      data: body,
      method,
    });

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api${url}`,
    //   {
    //     method,
    //     body: JSON.stringify(body),
    //     credentials: "include",
    //   }
    // );

    // const data = await response.json();

    console.log({
      response,
    });
    return {
      data: response.data,
      status: response.status,
      success: true,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        data: null,
        status: error.response?.status ?? HttpStatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.response?.data?.message,
      };
    }

    return {
      data: null,
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: HttpStatusPhrases.INTERNAL_SERVER_ERROR,
    };
  }
};
