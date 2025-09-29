export const POST_POSTCARD_REQUEST = "POST_POSTCARD_REQUEST";
export const POST_POSTCARD_SUCCESS = "POST_POSTCARD_SUCCESS";
export const POST_POSTCARD_FAIL = "POST_POSTCARD_FAIL";
export const postPostcardRequest = (data) => ({
  type: POST_POSTCARD_REQUEST,
  payload: data,
});
export const postPostcardSuccess = (data) => ({
  type: POST_POSTCARD_SUCCESS,
  payload: data,
});
export const postPostcardFail = (error) => ({
  type: POST_POSTCARD_FAIL,
  payload: error,
});
const initialState = {
  postPodcast: [],
  loading: false,
  error: null,
};
const postPostcardReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_POSTCARD_REQUEST:
      return { ...state, loading: true, error: null };
    case POST_POSTCARD_SUCCESS:
      return { ...state, loading: false, postPodcast: action.payload };
    case POST_POSTCARD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default postPostcardReducer;
