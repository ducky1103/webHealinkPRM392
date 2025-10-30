export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

export const deleteCommentRequest = (id) => ({
  type: DELETE_COMMENT_REQUEST,
  payload: { id },
});
export const deleteCommentSuccess = (data) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: data,
});
export const deleteCommentFailure = (error) => ({
  type: DELETE_COMMENT_FAILURE,
  payload: error,
});
const initialState = {
  loading: false,
  deletedComment: null,
  error: null,
};
export const deleteCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, loading: false, deletedComment: action.payload };
    case DELETE_COMMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default deleteCommentReducer;
