import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import PaymentCard from "./PaymentCard";
const EventProperties = ({
  _id,
  image,
  title,
  host,
  category,
  location,
  date,
  tickets,
  tags,
}) => {
  return (
    <div className="container">
      <img
        src={image}
        alt={title}
        className="w-100 object-fit-cover rounded-2"
        height={"345px"}
      />

      <div className="row my-3 justify-content-between">
        <div className="col-md-7">
          <h1 className="fs-3">
            <FaCalendarAlt /> {date} 7:00PM
          </h1>
          <h1 className="fs-4 my-3">
            <FaLocationDot /> {location}{" "}
          </h1>
          <div className="d-flex gap-3 my-4 align-items-center">
            {tags.map((tag, index) => {
              return (
                <p key={index} className="border border-3 py-1 px-2 rounded-2">
                  {tag}{" "}
                </p>
              );
            })}
          </div>
          <h1>{title} </h1>
          <p>
            Legendary British heavy metal band Iron Maiden rocked the stage at
            Teslim Balogun Stadium in Surulere, Lagos, delivering an
            electrifying performance that left fans in awe. With their iconic
            stage presence, powerful vocals, and epic guitar solos, Iron Maiden
            treated the crowd to a night of timeless classics and fan favorites.
            The stadium buzzed with energy as thousands of metalheads sang along
            to hits like "The Trooper" and "Run to the Hills," marking a
            historic moment in Nigeria's music scene. It was an unforgettable
            concert, cementing Iron Maiden's legacy as global heavy metal icons.
          </p>
        </div>
        <div className="col-md-4  text-white d-flex justify-content-start justify-content-md-end ">
          <PaymentCard />
        </div>
      </div>
    </div>
  );
};

export default EventProperties;
