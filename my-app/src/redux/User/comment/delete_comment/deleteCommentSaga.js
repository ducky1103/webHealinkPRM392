import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { message } from "antd";
import {
  DELETE_COMMENT_REQUEST,
  deleteCommentFailure,
  deleteCommentSuccess,
} from "./deleteCommentSlice";

function* deleteCommentSaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const token = yield select((state) => state.account.token);
    const { id } = action.payload;
    const response = yield call(
      axios.delete,
      `${URL_API}/comments/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    yield put(deleteCommentSuccess(response.data));
    message.success("Xóa bình luận thành công!");
  } catch (error) {
    console.error("Delete comment failed:", error);
    yield put(deleteCommentFailure(error.response?.data || error.message));
    message.error("Xóa bình luận thất bại!");
  }
}

export default function* watchDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteCommentSaga);
}
