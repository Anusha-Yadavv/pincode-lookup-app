import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPincodeRequest } from "../store/pincodeActions";
import "./Home.scss";
import { Button, Spin } from "antd";

const Home = () => {
  const [inputPincode, setInputPincode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loading = useSelector((state) => state.pincode.loading);
  const success = useSelector((state) => state.pincode.success);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      navigate("/pincode-details");
    }
  }, [success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pincodeRegex = /^[0-9]{6}$/; // Regular expression to match 6 digits
    if (!pincodeRegex.test(inputPincode)) {
      setError("Postal code must be 6 digits");
      return;
    }
    setError("");
    dispatch(fetchPincodeRequest(inputPincode));
  };
  

  return (
    <div className="home-container">
      {loading && <Spin />}

      <h1>Enter pincode</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pincode"
          maxLength="6"
          value={inputPincode}
          onChange={(e) => setInputPincode(e.target.value)}
        />
        <Button type="primary" htmlType="submit" loading={loading}>
          Lookup
        </Button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Home;
