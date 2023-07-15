import React from "react";

const Replies = (props) => {
  const selectedOrderHandler = (e) => {
    props.onSelect(e.target.dataset.id);
  };

  if (props.replies.length === 0) {
    return <p className="order__items--not-found">No Order Found.</p>;
  }

  return (
    <>
      <div id="orders">
        <div className="order__items">
          {props.replies.map((rep) => {
            return (
              <div key={rep.id} className="order__item">
                <div
                  className="order__item__id"
                  name="order"
                  data-id={rep.id}
                  id="order"
                  onClick={selectedOrderHandler}
                >
                  {rep.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Replies;
