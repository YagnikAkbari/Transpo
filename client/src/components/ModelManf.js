import React from "react";

const ModelManf = (props) => {
  const classes = `${props.className}`;
  return (
    <>
      <div className={classes} data={props.order.id}>
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
          <span>Transporter : </span>
          {props.order.sender}
        </h2>
        <h2>
          <span>Quantity: </span>
          {props.order.quantity}
        </h2>
        <h2>
          <span>Price: </span>
          {props.order.price}
        </h2>
      </div>
    </>
  );
};

export default ModelManf;
