import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_PINCODE_REQUEST,
  fetchPincodeSuccess,
  fetchPincodeFailure,
} from "./pincodeActions";
import axios from "axios";

function fetchPincodeAPI(pincode) {
  return axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
}

function* fetchPincode(action) {
  console.log("I AM ENTERING");
  try {
    const response = yield call(fetchPincodeAPI, action.payload);
    const data = response.data;

    // Handling API response
    if (data[0].Status === "Error") {
      yield put(fetchPincodeFailure(data[0].Message));
    } else {
      yield put(fetchPincodeSuccess(data[0].PostOffice));
      localStorage.setItem(
        "pincodeDetails",
        JSON.stringify(data[0].PostOffice)
      );
    }
  } catch (error) {
    yield put(
      fetchPincodeFailure(
        "An error occurred while fetching data. Please try again later."
      )
    );
  }
}

function* pincodeSaga() {
  yield takeLatest(FETCH_PINCODE_REQUEST, fetchPincode);
}

export default pincodeSaga;
