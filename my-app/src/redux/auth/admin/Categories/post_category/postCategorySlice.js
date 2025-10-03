export const POST_CATEGORY_REQUEST = "POST_CATEGORY_REQUEST";
export const POST_CATEGORY_SUCCESS = "POST_CATEGORY_SUCCESS";
export const POST_CATEGORY_FAIL = "POST_CATEGORY_FAIL";

export const postCategoryRequest = (data) => ({
  type: POST_CATEGORY_REQUEST,
  payload: data,
});
export const postCategorySuccess = (data) => ({
  type: POST_CATEGORY_SUCCESS,
  payload: data,
});
export const postCategoryFailure = (error) => ({
  type: POST_CATEGORY_FAIL,
  payload: error,
});
const initialState = {
  loading: false,
  postCategory: [],
  error: null,
};
const postCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case POST_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        postCategory: action.payload,
      };
    case POST_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
  }
  return state;
};
export default postCategoryReducer;
