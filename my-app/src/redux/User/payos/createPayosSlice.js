export const CREATE_PAYOS = "CREATE_PAYOS";
export const CREATE_PAYOS_SUCCESS = "CREATE_PAYOS_SUCCESS";
export const CREATE_PAYOS_FAIL = "CREATE_PAYOS_FAIL";

export const createPayos = (data) => ({
  type: CREATE_PAYOS,
  payload: data,
});

export const createPayosSuccess = (data) => ({
  type: CREATE_PAYOS_SUCCESS,
  payload: data,
});

export const createPayosFail = (error) => ({
  type: CREATE_PAYOS_FAIL,
  payload: error,
});

const initialState = {
  payos: null,
  loading: null,
  error: null,
};

const createPayosReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYOS:
      return { ...state, loading: true, error: null };
    case CREATE_PAYOS_SUCCESS:
      return { ...state, loading: false, payos: action.payload };
    case CREATE_PAYOS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default createPayosReducer;
