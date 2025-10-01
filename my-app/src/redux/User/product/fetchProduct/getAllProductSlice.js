export const GET_ALL_PRODUCT = "GET_ALL_PRODUCT";
export const GET_ALL_PRODUCT_SUCCESS = "GET_ALL_PRODUCT_SUCCESS";
export const GET_ALL_PRODUCT_FAIL = "GET_ALL_PRODUCT_FAIL";

export const getAllProduct = (data) => ({
  type: GET_ALL_PRODUCT,
  payload: data,
});

export const getAllProductSuccess = (data) => ({
  type: GET_ALL_PRODUCT_SUCCESS,
  payload: data,
});

export const getAllProductFail = (error) => ({
  type: GET_ALL_PRODUCT_FAIL,
  payload: error,
});

const initialState = {
  product: [],
  loading: null,
  error: null,
};

const getAllProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return { ...state, loading: true, error: null };
    case GET_ALL_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case GET_ALL_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getAllProductReducer;
