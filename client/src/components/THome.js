import React, { useState } from "react";
import Model from "./Model";
import { useSelector } from "react-redux";

const THome = () => {
  const [selectedId, setSelectedId] = useState("");

  const orders = useSelector((state) => state.user.user.orders);
  const receiver = useSelector((state) => state.user.user.uname);

  const selectedOrderIdHandler = (e) => {
    setSelectedId(e.target.dataset.id);
  };

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
    return null;
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
          {orders.length === 0 && (
            <p className="order__items--not-found">No Orders Found!</p>
          )}
        </div>
        <div id="main-section__transporter">{mainContent}</div>
      </div>
    </>
  );
};

export default THome;
