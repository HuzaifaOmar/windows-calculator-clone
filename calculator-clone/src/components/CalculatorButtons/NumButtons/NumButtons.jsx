import React from "react";
import styles from "./NumButtons.module.css";

const NumButtons = ({ onNumberClick }) => {
  const numberButtons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "+/-",
    "0",
    ".",
  ];

  return (
    <div className={styles["number-buttons-grid"]}>
      {numberButtons.map((number) => (
        <button
          key={number}
          onClick={() => onNumberClick(number === "+/-" ? "negate" : number)}
          className={styles["number-button"]}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default NumButtons;

