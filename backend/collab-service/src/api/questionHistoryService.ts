import axios from "axios";

const QN_HISTORY_SERVICE_URL =
  process.env.QN_HISTORY_SERVICE_URL ||
  "http://qn-history-service:3006/api/qnhistories";

const qnHistoryService = axios.create({
  baseURL: QN_HISTORY_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createQuestionHistory = (
  userIds: string[],
  questionId: string,
  title: string,
  submissionStatus: string,
  code: string,
  language: string,
  authToken: string
) => {
  const dateAttempted = new Date();
  return qnHistoryService.post(
    "/",
    {
      userIds,
      questionId,
      title,
      submissionStatus,
      dateAttempted,
      timeTaken: 0,
      code,
      language,
    },
    {
      headers: {
        Authorization: authToken,
      },
    }
  );
};
