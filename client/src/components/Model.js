import React, { useState } from "react";

import { useToasts } from "react-toast-notifications";
import { toastConfig } from "./utiles/config";

const Model = (props) => {
  const classes = `${props.className}`;
  const [price, setPrice] = useState("");
  const receiver = props.rec;
  const { addToast } = useToasts();
  const sendReply = async function (e) {
    e.preventDefault();

    if (!price) {
      addToast("Fill Data Properly!", { appearance: "error", ...toastConfig });
      return;
    }
    const order = props.order;
    const res = await fetch("/pushTOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price,
        receiver,
        order,
      }),
    });

    const data = await res.json();

    if (!data || res.status !== 200) {
      addToast("Invalid Details! (data not sent)", {
        appearance: "error",
        ...toastConfig,
      });
    } else {
      addToast(data.message, { appearance: "success", ...toastConfig });
    }
    setPrice("");
  };
  return (
    <>
      <div className={classes} data={props.id}>
        <div className="reply-data">
          <h2>
            <span>delivery address: </span>
            {props.order.to}
          </h2>
          <h2>
            <span>pickup address: </span>
            {props.order.from}
          </h2>
          <h2>
            <span>manufacturer Address: </span>
            {props.order.address}
          </h2>
          <h2>
            <span>manufacturer : </span>
            {props.order.sender}
          </h2>
          <h2>
            <span>Quantity: </span>
            {props.order.quantity}
          </h2>
        </div>
        <form method="POST" id="send-reply">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="price"
            name="price"
            placeholder="Rs"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            autoComplete="off"
          />

          <input
            className="transporter--btn"
            type="submit"
            value="Reply"
            name="signin"
            onClick={sendReply}
          ></input>
        </form>
      </div>
    </>
  );
};

export default Model;
