/* eslint-disable no-undef */
import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  POST_PRODUCT_REQUEST,
  productPostFailure,
  productPostSucess,
} from "./postProductSlice";
import axios from "axios";
import { getAllProductSuccess } from "../../../../User/product/fetchProduct/getAllProductSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* postProductSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const body = action.payload;
    const response = yield call(axios.post, `${URL_API}/products`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      yield put(productPostSucess(response.data));
      toast.success("Post product successfully");
      const fetchfetch = yield call(axios.get, `${URL_API}/products`, {
        params: {
          page: action.payload.page,
          size: action.payload.size,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (fetchfetch.status === 200 || fetchfetch.status === 201) {
        yield put(getAllProductSuccess(fetchfetch.data));
      } else {
        yield put(getAllProductFail(fetchfetch.status));
      }
    } else {
      yield put(productPostFailure("Failed to post product"));
      toast.error("Failed to post product");
    }
  } catch (error) {
    yield put(
      productPostFailure(error.response?.data?.message || error.message)
    );
  }
}
function* watchPostProductSaga() {
  yield takeLatest(POST_PRODUCT_REQUEST, postProductSaga);
}
export default watchPostProductSaga;
