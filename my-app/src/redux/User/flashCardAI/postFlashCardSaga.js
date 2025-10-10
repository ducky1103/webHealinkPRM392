import { call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";
import toast from "react-hot-toast";
import {
  POST_FLASHCARD_REQUEST,
  postFlashCardFailure,
  postFlashCardSuccess,
} from "./postFlashCardSlice";

const URL_API = import.meta.env.VITE_API_URL;

function* postFlashCardSaga(action) {
  try {
    const token = yield select((state) => state.account.token);
    const { reply } = action.payload;
    const response = yield call(
      axios.post,
      `${URL_API}/ai/flashcard`,
      { reply: reply },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      yield put(postFlashCardSuccess(response.data));
      toast.success("Tạo flashcard thành công! ");
    } else {
      yield put(postFlashCardFailure(response.statusText));
      toast.error("Tạo flashcard thất bại!");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    yield put(postFlashCardFailure(errorMessage));
    toast.error(`Lỗi: ${errorMessage}`);
    console.log("Error in postFlashCardSaga:", errorMessage);
  }
}
function* watchPostFlashCard() {
  yield takeLatest(POST_FLASHCARD_REQUEST, postFlashCardSaga);
}
export default watchPostFlashCard;
