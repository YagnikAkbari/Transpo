import React from "react";

import THome from "./THome";
import MHome from "./MHome";

import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  let content;

  if (user.userType === "MANUFACTURER") {
    content = <MHome />;
  } else if (user.userType === "TRANSPORTER") {
    content = <THome />;
  }

  return <>{content}</>;
};

export default Home;
