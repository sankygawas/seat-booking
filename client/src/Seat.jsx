import React from "react";

const Seat = props => {
  let seatBookedClass = "m-2 btn ";
  seatBookedClass+=props.booked?" btn-primary":" btn-outline-secondary";
  return (
    <button
      onClick={()=>props.onBook(props.seatId,props.row.rowName)}
      style={{ width: 50 }}
      className={seatBookedClass}
    >
      {props.seatId}
    </button>
  );
};

export default Seat;
