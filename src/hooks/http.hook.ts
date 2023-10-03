import axios, { AxiosRequestConfig } from "axios";

export const useHttp = () => {
  const request = async (
    id?: string | null,
    method = "GET",
    body: string | null = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    let url: string = id
      ? `http://localhost:3001/tasks/${id}`
      : "http://localhost:3001/tasks/";

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
      throw new Error(e.response ? e.response.data : e.message);
    }
  };

  return { request };
};
