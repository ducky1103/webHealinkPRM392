export const FETCH_CATEGORY_REQUEST = "FETCH_CATEGORY_REQUEST";
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const FETCH_CATEGORY_FAIL = "FETCH_CATEGORY_FAIL";

export const fetchCategoryRequest = (data) => ({
  type: FETCH_CATEGORY_REQUEST,
  payload: data,
});
export const fetchCategorySuccess = (data) => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: data,
});
export const fetchCategoryFailure = (error) => ({
  type: FETCH_CATEGORY_FAIL,
  payload: error,
});
const initialState = {
  loading: false,
  fetchCategory: [],
  error: null,
};
const fetchCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        fetchCategory: action.payload,
      };
    case FETCH_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
  }
  return state;
};
export default fetchCategoryReducer;
