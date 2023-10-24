import axios, { AxiosRequestConfig } from "axios";

export const useHttp = () => {
  const request = async (
    id: string | null,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body: string | null = null,
    headers: { "Content-Type": string } = { "Content-Type": "application/json" }
  ) => {
    let url: any = id
      ? `${process.env.REACT_APP_BASE_URL_TASKS}${id}`
      : process.env.REACT_APP_BASE_URL_TASKS;

    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        headers,
      };

      if (body) {
        config.data = body;
      }

      const response = await axios(config);

      return response.data;
    } catch (e: any) {
      throw new Error(JSON.stringify(e.response ? e.response.data : e.message));
    }
  };

  return { request };
};
