import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  POST_CATEGORY_REQUEST,
  postCategoryFailure,
  postCategorySuccess,
} from "./postCategorySlice";

const URL_API = import.meta.env.VITE_API_URL;
function* postCategorySaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/categories/admin/create`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      yield put(postCategorySuccess(response.data));
      toast.success("Post category successfully");
    } else {
      yield put(postCategoryFailure(response.status));
      toast.error("Failed to post category");
    }
  } catch (error) {
    yield put({
      type: "POST_CATEGORY_FAIL",
      payload: error.response?.data?.message || error.message,
    });
    toast.error("Failed to post category");
  }
}
function* watchPostCategorySaga() {
  yield takeLatest(POST_CATEGORY_REQUEST, postCategorySaga);
}
export default watchPostCategorySaga;
