import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  UPDATE_CATEGORY_REQUEST,
  updateCategoryFailure,
  updateCategorySuccess,
} from "./updateCategorySlice";

function* updateCategorySaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const { id, data } = action.payload;
    const token = yield select((state) => state.account.token);

    const response = yield call(
      axios.put,
      `${URL_API}/categories/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      yield put(updateCategorySuccess(response.data));
      toast.success("Cập nhật danh mục thành công!");
    } else {
      yield put(updateCategoryFailure("Failed to update category"));
      toast.error("Không thể cập nhật danh mục");
    }
  } catch (error) {
    yield put(updateCategoryFailure(error));
    toast.error("Không thể cập nhật danh mục");
  }
}

function* watchUpdateCategory() {
  yield takeLatest(UPDATE_CATEGORY_REQUEST, updateCategorySaga);
}
export default watchUpdateCategory;
