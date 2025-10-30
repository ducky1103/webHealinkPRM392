export const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";

export const updateCommentRequest = (payload) => ({
  type: UPDATE_COMMENT_REQUEST,
  payload,
});
export const updateCommentSuccess = (data) => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload: data,
});
export const updateCommentFailure = (error) => ({
  type: UPDATE_COMMENT_FAILURE,
  payload: error,
});
const initialState = {
  loading: false,
  updateComment: null,
  error: null,
};
export const updateCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_COMMENT_SUCCESS:
      return { ...state, loading: false, updateComment: action.payload };
    case UPDATE_COMMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default updateCommentReducer;
