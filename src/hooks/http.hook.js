import axios from "axios";

export const useHttp = () => {
  const request = async (
    url,
    method = "GET",
    body = null,
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const config = {
        method,
        url,
        headers,
      };

      if (body) {
        config.data = body;
      }

      const response = await axios(config);

      return response.data;
    } catch (e) {
      throw new Error(e.response ? e.response.data : e.message);
    }
  };

  return { request };
};
