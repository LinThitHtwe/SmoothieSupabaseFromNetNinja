import React from "react";

const SmoothieCard = ({ smoothie }) => {
  console.log(smoothie);
  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.review}</div>
    </div>
  );
};

export default SmoothieCard;
