import {
  FETCH_PINCODE_FAILURE,
  FETCH_PINCODE_SUCCESS,
  FETCH_PINCODE_REQUEST,
} from "./pincodeActions";

const initialState = {
  loading: false,
  error: "",
  results: [],
  success: false,
};

const pincodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PINCODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        success: false,
      };
    case FETCH_PINCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        success: true,
      };
    case FETCH_PINCODE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default pincodeReducer;
