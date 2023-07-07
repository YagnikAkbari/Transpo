import React from "react";

import useFetch from "./hooks/useFetch";
import THome from "./THome";
import MHome from "./MHome";

const Home = () => {
  const user = useFetch({
    method: "GET",
    url: "/getData",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: {},
  });

  let content;

  if (user.userType === "MANUFACTURER") {
    content = <MHome />;
  } else if (user.userType === "TRANSPORTER") {
    content = <THome />;
  }

  return <>{content}</>;
};

export default Home;
