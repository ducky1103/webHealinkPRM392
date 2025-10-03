export const DELETE_CATEGORY_REQUEST = "DELETE_CATEGORY_REQUEST";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE";

export const deleteCategoryRequest = (id) => ({
  type: DELETE_CATEGORY_REQUEST,
  payload: id,
});
export const deleteCategorySuccess = (id) => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: id,
});
export const deleteCategoryFailure = (error) => ({
  type: DELETE_CATEGORY_FAILURE,
  payload: error,
});

const initialState = {
  loading: false,
  error: null,
  deletedCategoryId: null,
};

export const deleteCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        deletedCategoryId: null,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        deletedCategoryId: action.payload,
        error: null,
      };
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        deletedCategoryId: null,
      };
    default:
      return state;
  }
};
export default deleteCategoryReducer;
