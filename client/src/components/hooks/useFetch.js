import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useFetch = function (config) {
  const [user, setUser] = useState({});
  const headers = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const getUser = async function () {
    try {
      const res = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
        credentials: config.credentials,
      });
      if (!res.ok) {
        throw new Error(`Response status ${res.status} (not responsed)`);
      }

      const data = await res.json();
      setUser(data);
      if (!data) {
        throw new Error(`data not extracted prperly from JSON`);
      }
    } catch (err) {
      console.error(`${err.message} (Custom Error Thrown💥💥💥)`);
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      return headers("/mlogin");
    }
    getUser();
  }, []);
  return user;
};
export default useFetch;
