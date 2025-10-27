import { call, put, select, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_ALL_COMMENT_BY_ORDER_ITEM_ID,
  fetchAllCommentByOrderItemIdSuccess,
  fetchAllCommentByOrderItemIdFailure,
} from "./fetchAllCommentByOrderItemIdSlice";

const URL_API = import.meta.env.VITE_API_URL;
function* fetchAllCommentByOrderItemIdSaga(action) {
  try {
    const orderItemId = action.payload;
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.get,
      `${URL_API}/review/order/${orderItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      // API trả về { data: [...], message: "..." }
      const comments = response.data?.data || [];

      // Truyền orderItemId và comments vào success action (luôn dispatch kể cả empty)
      yield put(fetchAllCommentByOrderItemIdSuccess(orderItemId, comments));
    } else {
      console.error("Fetch comments failed with status:", response.status);
      yield put(fetchAllCommentByOrderItemIdFailure(response.status));
    }
  } catch (error) {
    // Vẫn dispatch failure để clear loading state
    yield put(
      fetchAllCommentByOrderItemIdFailure(
        error.response?.data?.message || error.message
      )
    );
  }
}

export default function* watchFetchAllCommentByOrderItemIdSaga() {
  yield takeEvery(
    FETCH_ALL_COMMENT_BY_ORDER_ITEM_ID,
    fetchAllCommentByOrderItemIdSaga
  );
}
