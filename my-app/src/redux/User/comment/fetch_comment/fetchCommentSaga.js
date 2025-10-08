import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  GET_COMMENTS,
  getCommentsFailure,
  getCommentsSuccess,
} from "./fetchCommentSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* getCommentsSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const podcastId = action.payload;

    console.log("Fetching comments for podcast:", podcastId);
    console.log("API URL:", `${URL_API}/api/comments/podcast/${podcastId}`);
    console.log("Token:", token);

    const response = yield call(
      axios.get,
      `${URL_API}/comments/podcast/${podcastId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Comments response:", response);

    if (response.status === 200) {
      yield put(getCommentsSuccess(response.data));
    } else {
      yield put(getCommentsFailure(response.statusText));
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    const errorMessage = error.response?.data?.message || error.message;
    yield put(getCommentsFailure(errorMessage));
  }
}

function* watchGetComments() {
  yield takeLatest(GET_COMMENTS, getCommentsSaga);
}

export default watchGetComments;
