import React from "react";
import { useState } from "react";
import ActionBtn from "../ActionBtn";

const PaymentCard = () => {
  // State to hold the ticket counts
  const [vipCount, setVipCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);

  // Total ticket calculation
  const totalTickets = vipCount + regularCount;

  // Function to increment/decrement ticket counts
  const handleVipChange = (type) => {
    setVipCount(type === "increase" ? vipCount + 1 : Math.max(vipCount - 1, 0));
  };

  const handleRegularChange = (type) => {
    setRegularCount(
      type === "increase" ? regularCount + 1 : Math.max(regularCount - 1, 0)
    );
  };
  return (
    <div
      className="bg-dark rounded-2 p-3"
      style={{ width: "300px", height: "307px" }}
    >
      <h3 className="text-center">Select Ticket</h3>
      <div className="ticket-type mt-4">
        <span>VIP</span>
        <div className="counter d-flex gap-2">
          <button onClick={() => handleVipChange("decrease")}>-</button>
          <span>{vipCount}</span>
          <button onClick={() => handleVipChange("increase")}>+</button>
        </div>
      </div>

      <div className="ticket-type">
        <span>Regular</span>
        <div className="counter d-flex gap-2">
          <button onClick={() => handleRegularChange("decrease")}>-</button>
          <span>{regularCount}</span>
          <button onClick={() => handleRegularChange("increase")}>+</button>
        </div>
      </div>
      <hr />
      <div className="total">
        <span>Total</span>
        <div className="counter d-flex gap-2">
          <button className="invisible">-</button>
          <span>{totalTickets}</span>
          <button className="invisible">+</button>
        </div>
      </div>

      <ActionBtn
        content="Proceed To Payment"
        width={"100%"}
        className="herobtn"
      />
    </div>
  );
};

export default PaymentCard;
