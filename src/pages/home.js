import React from "react";
import Payment from "../components/payment/payment";
import Travels from "../components/travels/travels";

const Home = (props) => {
  return (
    <>
      <Travels />
      <Payment />
    </>
  );
};

export default Home;
