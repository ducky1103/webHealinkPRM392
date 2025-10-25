import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE_COMMENT_REQUEST,
  createCommentSuccess,
  createCommentFailure,
} from "./createCommentSlice";
import { toast } from "react-toastify";
import {
  fetchAllCommentByUserFailure,
  fetchAllCommentByUserSuccess,
} from "../fetchAllCommentByUser/fetchAllCommentByUserSlice";

const URL_API = import.meta.env.VITE_API_URL;
console.log("API", URL_API);
function* createCommentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(
      axios.post,
      `${URL_API}/review/create`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(createCommentSuccess(response.data));
      toast.success("Comment created successfully");
      const fetch = yield call(
        axios.get,
        `${URL_API}/review/user/${action.payload}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (fetch.status === 200 || fetch.status === 201) {
        yield put(fetchAllCommentByUserSuccess(fetch.data));
      } else {
        yield put(fetchAllCommentByUserFailure("Failed to fetch comments"));
      }
    } else {
      yield put(createCommentFailure("Failed to create comment"));
      toast.error("Failed to create comment");
    }
  } catch (error) {
    yield put(createCommentFailure(error.message));
    toast.error("An error occurred while creating comment");
  }
}
function* watchCreateCommentSaga() {
  yield takeLatest(CREATE_COMMENT_REQUEST, createCommentSaga);
}
export default watchCreateCommentSaga;
