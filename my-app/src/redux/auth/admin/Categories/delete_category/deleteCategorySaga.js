import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  DELETE_CATEGORY_REQUEST,
  deleteCategoryFailure,
  deleteCategorySuccess,
} from "./deleteCategorySlice";

function* deleteCategorySaga(action) {
  const URL_API = import.meta.env.VITE_API_URL;
  try {
    const id = action.payload;
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.delete, `${URL_API}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 204) {
      yield put(deleteCategorySuccess(id));
      toast.success("Xóa danh mục thành công!");
    } else {
      yield put(deleteCategoryFailure("Failed to delete category"));
      toast.error("Không thể xóa danh mục");
    }
  } catch (error) {
    yield put(deleteCategoryFailure(error));
  }
}
function* watchDeleteCategory() {
  yield takeLatest(DELETE_CATEGORY_REQUEST, deleteCategorySaga);
}
export default watchDeleteCategory;
