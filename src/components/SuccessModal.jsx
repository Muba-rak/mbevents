import React from "react";

import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { BiCheckDouble } from "react-icons/bi";
import ActionBtn from "./ActionBtn";

const SuccessModal = ({ showModal }) => {
  return (
    <div>
      <Modal
        centered
        className="text-center rounded-2 p-0"
        show={showModal}
        animation={true}
      >
        <Modal.Body>
          <BiCheckDouble
            className="main-color  w-25 h-25"
            //   style={{ fontSize: "50px" }}
          />
          <h2 className="my-2">Awesome</h2>
          <p>Your event has been created</p>
          <div className="bg-dark p-5 rounded-2 ">
            <Link to="/" className="text-decoration-none">
              <ActionBtn content="Back to Home" />
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SuccessModal;
