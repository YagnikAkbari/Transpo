import React, { useEffect, useState } from "react";

import Replies from "./Replies";
import Searchbar from "./Searchbar";
import OrderForm from "./OrderForm";
import ModelManf from "./ModelManf";
import { useSelector } from "react-redux";

const MHome = () => {
  const [isFiltered, setisFiltered] = useState(false);
  const [filteredReplies, setFilteredReplies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [transporterData, setTransporterData] = useState([]);

  const replies = useSelector((state) => state.user.user.replies);

  const getTransporter = async function () {
    const res = await fetch("/getTransporter", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    setTransporterData(data);
  };

  useEffect(() => {
    getTransporter();
  }, []);

  const searchabarHandler = (id) => {
    setSearchId(id);
    const tempReplies = replies.slice();
    const filters = tempReplies.filter((rep) => {
      return rep.id.includes(id);
    });
    setisFiltered(true);
    setFilteredReplies(filters);
  };

  const showFormHandler = function () {
    setShowForm(true);
  };

  const formCloseHandler = () => {
    setShowForm(false);
  };

  const resetHandler = () => {
    setisFiltered(false);
  };

  const selectedOrderIdHandler = (id) => {
    setSelectedId(id);
  };

  const mainSectionContent = replies.map((rep) => {
    if (selectedId === rep.id) {
      return (
        <ModelManf className="order__item--data" key={rep.id} order={rep} />
      );
    }
    return null;
  });

  const finalReplies = isFiltered ? filteredReplies : replies;

  return (
    <>
      <div id="section--1">
        <div id="order-sidebar">
          <div id="order-header">
            <div>Orders</div>
            <button onClick={showFormHandler} id="modal-button">
              +
            </button>
          </div>
          <Searchbar onSearch={searchabarHandler} />
          <button
            type="button"
            id="reset-btn"
            className="btn"
            onClick={resetHandler}
          >
            Reset
          </button>
          {showForm && (
            <OrderForm
              transporterData={transporterData}
              onHandleClose={formCloseHandler}
            />
          )}
          <Replies
            replies={finalReplies}
            searchId={searchId}
            onSelect={selectedOrderIdHandler}
          />
        </div>
        <div id="main-section__manufacturer">{mainSectionContent}</div>
      </div>
    </>
  );
};

export default MHome;
