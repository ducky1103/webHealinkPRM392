import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import toast from "react-hot-toast";
import {
  POST_COMMENT,
  postCommentFailure,
  postCommentSuccess,
} from "./postCommentSilce";

const URL_API = import.meta.env.VITE_API_URL;

function* postCommentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const { podcastId, commentUser, content } = action.payload;

    const requestData = {
      podcastId: podcastId,
      commentUser: commentUser,
      content: content,
    };

    console.log("Posting comment:", requestData);
    console.log("Token:", token);

    const response = yield call(
      axios.post,
      `${URL_API}/comments/create`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(postCommentSuccess(response.data));
      toast.success("Đã thêm bình luận thành công! 💬");
    } else {
      yield put(postCommentFailure(response.statusText));
      toast.error("Thêm bình luận thất bại!");
    }
  } catch (error) {
    console.error("Error posting comment:", error);
    const errorMessage = error.response?.data?.message || error.message;
    yield put(postCommentFailure(errorMessage));
    toast.error(`Lỗi: ${errorMessage}`);
  }
}

function* watchPostComment() {
  yield takeLatest(POST_COMMENT, postCommentSaga);
}

export default watchPostComment;
