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

    if (response.status === 429) {
      const error = new Error("Too many requests. Please try again later.");
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

    const result = response.data.results;

    const sortedResult = result.sort((a, b) => {
      const difficultyOrder = {
        easy: 1,
        medium: 2,
        hard: 3,
      };

      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });

    return sortedResult;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        const customError = new Error(
          "An error occurred while fetching questions data"
        );
        customError.code = 400;
        customError.info = error.response.data;
        throw customError;
      }
      if (error.response.status === 429) {
        const customError = new Error(
          "Too many requests. Please try again later."
        );
        customError.code = 429;
        customError.info = error.response.data;
        throw customError;
      }
    }

    throw error;
  }
}
