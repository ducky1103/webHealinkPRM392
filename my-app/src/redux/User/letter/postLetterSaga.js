import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import toast from "react-hot-toast";
import {
  POST_LETTER,
  postLetterFailure,
  postLetterSuccess,
} from "./postLetterSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* postLetterSaga(action) {
  try {
    const token = yield select((state) => state.account.token);

    const { recipient, title, description, sendTime } = action.payload;

    const requestData = {
      title: title,
      description: description,
      sendTime: sendTime, // Format: "2025-10-07T12:24:24.396Z"
    };

    const response = yield call(
      axios.post,
      `${URL_API}/emails/schedule`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          recipient: recipient, // Email người nhận
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      yield put(postLetterSuccess(response.data));
      toast.success("Thư đã được lên lịch gửi thành công! 🎉");
    } else {
      yield put(postLetterFailure(response.statusText));
      toast.error("Gửi thư thất bại!");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(postLetterFailure(errorMessage));
    toast.error(`Lỗi: ${errorMessage}`);
    console.log("Error in postLetterSaga:", errorMessage);
  }
}

function* watchPostLetter() {
  yield takeLatest(POST_LETTER, postLetterSaga);
}

export default watchPostLetter;
