import React, { useEffect, useState } from "react";
import Model from "./Model";
import Loader from "./loader/Loader";

const THome = () => {
  const [orders, setOrders] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [loader, setLoader] = useState(true);

  const getTOrders = async function () {
    try {
      const res = await fetch("/getTOrder", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setReceiver(data.uname);
      if (!data.orders) {
        return;
      }
      setOrders(data.orders);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTOrders();
  }, []);

  const selectedOrderIdHandler = (e) => {
    setSelectedId(e.target.dataset.id);
  };

  if (loader) {
    return <Loader />;
  }

  const content = orders.map((ord) => {
    return (
      <div key={ord.id} className="order__item">
        <div
          className="order__item__id"
          data-id={ord.id}
          onClick={selectedOrderIdHandler}
        >
          {ord.id}
        </div>
      </div>
    );
  });

  const mainContent = orders.map((ord) => {
    if (selectedId === ord.id) {
      return (
        <Model
          order={ord}
          key={ord.id}
          className="reply__item--data"
          rec={receiver}
        />
      );
    }
  });

  return (
    <>
      <div id="section--2">
        <div id="order-sidebar">
          {orders.length > 0 && (
            <div className="orders">
              <div className="order__item">
                <div>{content}</div>
              </div>
            </div>
          )}
          {orders.length == 0 && !loader && (
            <p className="order__items--not-found">No Orders Found!</p>
          )}
        </div>
        <div id="main-section__transporter">{mainContent}</div>
      </div>
    </>
  );
};

export default THome;
