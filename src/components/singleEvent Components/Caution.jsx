import React from "react";
import Modal from "react-bootstrap/Modal";
import ActionBtn from "../ActionBtn";
import { Link } from "react-router-dom";
const Caution = ({ showModal, setShowModal }) => {
  return (
    <Modal centered show={showModal} onHide={() => setShowModal(false)}>
      <div
        className="p-4 bg-black text-white rounded-2 d-flex justify-content-center align-items-center"
        style={{ height: "250px" }}
      >
        <div className="text-center">
          <h1 className="fs-4 text-danger">Login</h1>
          <p className="text-center">You have to login to pay for a ticket</p>
          <Link to="/login">
            <ActionBtn content="Proceed to Login" width="100%" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default Caution;
