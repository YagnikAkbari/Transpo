import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toastConfig } from "./utiles/config";
import { useToasts } from "react-toast-notifications";

const OrderForm = (props) => {
  let name, value;
  const [transport, setTransport] = useState({
    toAddress: "",
    fromAddress: "",
    quantity: "",
    transporter: "",
    address: "",
  });

  const { addToast } = useToasts();

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setTransport({ ...transport, [name]: value });
  };

  const pushOrder = async (e) => {
    e.preventDefault();
    const { toAddress, fromAddress, quantity, transporter, address } =
      transport;
    const res = await fetch("/pushManuOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: toAddress,
        from: fromAddress,
        quantity,
        transporter,
        address,
      }),
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      addToast(data.message, { appearance: "error", ...toastConfig });
    } else {
      addToast(data.message, { appearance: "success", ...toastConfig });
      props.onHandleClose();
      setTransport({
        toAddress: "",
        fromAddress: "",
        quantity: "",
        address,
        transporter: "",
      });
    }
  };
  const getAddress = async function () {
    const res = await fetch("/getData", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    setTransport({ ...transport, address: data.address });
    if (res.status !== 200) {
      return;
    }
  };

  const handleClose = () => {
    props.onHandleClose();
  };

  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <div className="overlay" onClick={handleClose}></div>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Dispatch Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form method="POST" id="order-dispatch-form">
            <div className="form-group">
              <label htmlFor="toAddress" className="form-label">
                To:
              </label>
              <input
                type="text"
                className="form-control"
                id="toAddress"
                name="toAddress"
                placeholder="To Address"
                value={transport.toAddress}
                onChange={handleInputs}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fromAddress" className="form-label">
                From:
              </label>
              <input
                type="text"
                className="form-control"
                id="fromAddress"
                name="fromAddress"
                placeholder="From Address"
                value={transport.fromAddress}
                onChange={handleInputs}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="pickup Address"
                value={transport.address}
                onChange={handleInputs}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fromAddress" className="form-label">
                Quantity:
              </label>
              <select
                name="quantity"
                id="quantity"
                className="form-select"
                onChange={handleInputs}
                value={transport.quantity}
              >
                <option value="" disabled selected>Select Qty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fromAddress" className="form-label">
                Transporter:
              </label>
              <select
                name="transporter"
                className="form-select"
                id="transporter"
                onChange={handleInputs}
                value={transport.transporter}
              
              ><option value="" disabled selected>Select Transporter</option>
                {props.transporterData.map((val) => {
                  return (
                    <option value={val} key={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="actions">
              <input
                className="btn btn-primary"
                variant="primary"
                type="submit"
                value="Push"
                name="Push"
                onClick={pushOrder}
              />
              <input
                className="btn btn-primary"
                type="button"
                value="Close"
                onClick={handleClose}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default OrderForm;
