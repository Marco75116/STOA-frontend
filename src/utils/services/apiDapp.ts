import axios from "axios";
import { HistoryYield } from "../types/swap.types";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "defi/",
  timeout: 30000,
});

const apiService = {
  getHistoryYield: () =>
    instance.get<HistoryYield[]>(`historyYield/`).catch((error) => {
      throw new Error("getHistoryYield call failed: " + error);
    }),
};

export default apiService;