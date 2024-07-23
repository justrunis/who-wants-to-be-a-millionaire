import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const BASE_URL = "https://opentdb.com/api.php?amount=15&type=multiple";

export const queryClient = new QueryClient();

export async function fetchQuestions() {
  try {
    const response = await axios.get(BASE_URL);

    if (response.status === 400) {
      const error = new Error(
        "An error occurred while fetching questions data"
      );
      error.code = response.status;
      error.info = response.data;
      throw error;
    }

    if (!response.data) {
      const error = new Error(
        "There is no data available for the requested questions"
      );
      error.code = response.status;
      error.info = response.data;
      throw error;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    } else {
      return error;
    }
  }
}
