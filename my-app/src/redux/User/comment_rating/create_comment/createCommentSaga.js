import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CREATE_COMMENT_REQUEST,
  createCommentSuccess,
  createCommentFailure,
} from "./createCommentSlice";
import { toast } from "react-toastify";
import {
  fetchAllCommentByOrderItemIdFailure,
  fetchAllCommentByOrderItemIdSuccess,
} from "../fetchAllCommentByOrderItemId/fetchAllCommentByOrderItemIdSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* createCommentSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const orderItemId = action.payload.orderItemId;

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
      toast.success("Đánh giá thành công");

      // Fetch lại comments cho orderItem sau khi tạo thành công
      const fetch = yield call(
        axios.get,
        `${URL_API}/review/order/${orderItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (fetch.status === 200 || fetch.status === 201) {
        const comments = fetch.data?.data || [];
        yield put(fetchAllCommentByOrderItemIdSuccess(orderItemId, comments));
      } else {
        yield put(
          fetchAllCommentByOrderItemIdFailure("Failed to fetch comments")
        );
      }
    } else {
      yield put(createCommentFailure("Failed to create comment"));
      toast.error("Đánh giá thất bại");
    }
  } catch (error) {
    yield put(createCommentFailure(error.message));
    toast.error("Đã có lỗi xảy ra khi tạo đánh giá");
  }
}
function* watchCreateCommentSaga() {
  yield takeLatest(CREATE_COMMENT_REQUEST, createCommentSaga);
}
export default watchCreateCommentSaga;
