export const FETCH_PINCODE_REQUEST = "FETCH_PINCODE_REQUEST";
export const FETCH_PINCODE_SUCCESS = "FETCH_PINCODE_SUCCESS";
export const FETCH_PINCODE_FAILURE = "FETCH_PINCODE_FAILURE";

export const fetchPincodeRequest = (pincode) => ({
  type: FETCH_PINCODE_REQUEST,
  payload: pincode,
});

export const fetchPincodeSuccess = (results) => ({
  type: FETCH_PINCODE_SUCCESS,
  payload: results,
});

export const fetchPincodeFailure = (error) => ({
  type: FETCH_PINCODE_FAILURE,
  payload: error,
});
