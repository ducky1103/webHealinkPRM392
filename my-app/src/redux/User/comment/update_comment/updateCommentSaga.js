import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";
import {
  UPDATE_COMMENT_REQUEST,
  updateCommentFailure,
  updateCommentSuccess,
} from "./updateCommentSlice";

function* updateCommentSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;

  try {
    const token = yield select((state) => state.account.token);
    const { commentId, podcastId, commentUser, content } = action.payload;

    const response = yield call(
      axios.put,
      `${URL_API}/comments/update/${commentId}`,
      {
        podcastId,
        commentUser,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    yield put(updateCommentSuccess(response.data));
    message.success("Cập nhật bình luận thành công!");
  } catch (error) {
    console.error("Update comment failed:", error);
    yield put(updateCommentFailure(error.response?.data || error.message));
    message.error("Cập nhật bình luận thất bại!");
  }
}

export default function* watchUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateCommentSaga);
}
