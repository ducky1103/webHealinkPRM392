import axios from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  FETCH_CATEGORY_REQUEST,
  fetchCategoryFailure,
  fetchCategorySuccess,
} from "./fetchCategorySlice";

const URL_API = import.meta.env.VITE_API_URL;
function* handleFetchCategory() {
  try {
    const token = yield select((state) => state.account.token);
    const response = yield call(axios.get, `${URL_API}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      yield put(fetchCategorySuccess(response.data));
    } else {
      yield put(fetchCategoryFailure("Failed to fetch category"));
    }
  } catch (error) {
    yield put(
      fetchCategoryFailure(error.response?.data?.message || error.message)
    );
    toast.error("Failed to fetch category");
  }
}

function* watchFetchCategorySaga() {
  yield takeLatest(FETCH_CATEGORY_REQUEST, handleFetchCategory);
}
export default watchFetchCategorySaga;
