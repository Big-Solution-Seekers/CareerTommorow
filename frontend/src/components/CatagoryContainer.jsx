import React from "react";
import { useNavigate } from "react-router-dom";

const CatagoryCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/detail');
  };

  return (
    <div className="homepageCards">
      <div className="Cards" onClick={handleClick}>
        <h2>Technology</h2>
        <p>This is a description of the card.</p>
      </div>
      <div className="Cards" onClick={handleClick}>
        <h2>Buisness/Marketing</h2>
        <p>This is a description of the card.</p>
      </div>
      <div className="Cards" onClick={handleClick}>
        <h2>Healthcare</h2>
        <p>This is a description of the card.</p>
      </div>
      <div className="Cards" onClick={handleClick}>
        <h2>MER?</h2>
        <p>This is a description of the card.</p>
      </div>
    </div>
  );
};

export default CatagoryCard