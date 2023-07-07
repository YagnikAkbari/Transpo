import React, { useEffect, useState } from "react";

import Replies from "./Replies";
import Searchbar from "./Searchbar";
import OrderForm from "./OrderForm";
import ModelManf from "./ModelManf";

const MHome = () => {
  const [replies, setReplies] = useState([]);
  const [isFiltered, setisFiltered] = useState(false);
  const [filteredReplies, setFilteredReplies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [transporterData, setTransporterData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getMReply = async function () {
    const res = await fetch("/getMReply", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (!data.repelies) {
      setReplies([]);
      return;
    }
    setReplies(data.repelies);
    setLoader(false);
  };

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
    getMReply();
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
            loader={loader}
          />
        </div>
        <div id="main-section__manufacturer">{mainSectionContent}</div>
      </div>
    </>
  );
};

export default MHome;
