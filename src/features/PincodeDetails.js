import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPincodeRequest,
  fetchPincodeSuccess,
  fetchPincodeFailure,
} from "../store/pincodeActions";
import { InputAdornment, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./PincodeDetails.scss";

const PincodeDetails = () => {
  const [filter, setFilter] = useState("");
  const results = useSelector((state) => state.pincode.results);
  const loading = useSelector((state) => state.pincode.loading);
  const error = useSelector((state) => state.pincode.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedPincodeDetails = localStorage.getItem("pincodeDetails");
    if (storedPincodeDetails) {
      const parsedDetails = JSON.parse(storedPincodeDetails);
      dispatch(fetchPincodeSuccess(parsedDetails));
    }
  }, [dispatch]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredResults = results.filter((postOffice) =>
    postOffice.Name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="pincode-details-container">
      <h1>Pincode: {results.length > 0 ? results[0].Pincode : ""}</h1>
      <h3>
        Message:{" "}
        <span className="span-text">
          Number of pincode(s) found:{" "}
          <strong style={{ color: "red" }}>{results.length}</strong>
        </span>{" "}
      </h3>
      <Input
        type="text"
        placeholder="Filter"
        value={filter}
        onChange={handleFilterChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{
          width: "50vw",
          padding: "5px",
          borderRadius: "5px",
          border: "3px solid black",
          fontSize: "16px",
          "&:focus": {
            outline: "none",
            borderColor: "black",
          },
        }}
      />

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {filteredResults.length === 0 && !loading && !error && (
        <div>Couldn't find the postal data you're looking for...</div>
      )}
      <div className="post-office-container">
        {filteredResults.map((postOffice, index) => (
          <div className="post-office" key={index}>
            <p>
              <strong>Post Office Name:</strong> {postOffice.Name}
            </p>
            <p>
              <strong>Branch Type:</strong> {postOffice.BranchType}
            </p>
            <p>
              <strong>Delivery Status:</strong> {postOffice.DeliveryStatus}
            </p>
            <p>
              <strong>District:</strong> {postOffice.District}
            </p>
            <p>
              <strong>State:</strong> {postOffice.State}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PincodeDetails;
