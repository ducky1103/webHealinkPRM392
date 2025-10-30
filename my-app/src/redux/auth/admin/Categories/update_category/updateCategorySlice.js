export const UPDATE_CATEGORY_REQUEST = "UPDATE_CATEGORY_REQUEST";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_FAILURE = "UPDATE_CATEGORY_FAILURE";

export const updateCategoryRequest = (data) => ({
  type: UPDATE_CATEGORY_REQUEST,
  payload: data,
});
export const updateCategorySuccess = (data) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload: data,
});

export const updateCategoryFailure = (error) => ({
  type: UPDATE_CATEGORY_FAILURE,
  payload: error,
});

const initialState = {
  loading: false,
  error: null,
  updatedCategory: null,
};
export const updateCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        updatedCategory: null,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedCategory: action.payload,
        error: null,
      };
    case UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updatedCategory: null,
      };
    default:
      return state;
  }
};
export default updateCategoryReducer;
