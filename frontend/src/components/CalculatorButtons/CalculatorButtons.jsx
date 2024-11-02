import React from "react";
import NumButtons from "./NumButtons/NumButtons.jsx";
import styles from "./CalculatorButtons.module.css";

const CalculatorButtons = ({
  onNumberClick,
  onOperatorClick,
  onClearClick,
  onEqualsClick,
  onBackspaceClick,
}) => {
  const renderOperatorButton = (operator) => (
    <button
      key={operator}
      onClick={() => onOperatorClick(operator)}
      className={styles["op-button"]}
    >
      {operator == "x^2" ? "x²" : operator}
    </button>
  );

  return (
    <div className={styles["calculator-buttons-grid"]}>
      {renderOperatorButton("%")}
      <button
        onClick={onClearClick}
        className={styles["op-button"]}
        id="clear-button"
      >
        CLEAR
      </button>
      {
        <button onClick={onBackspaceClick} className={styles["op-button"]}>
          ⌫
        </button>
      }
      {renderOperatorButton("1/x")}
      {renderOperatorButton("x^2")}
      {renderOperatorButton("√")}
      {renderOperatorButton("/")}
      {renderOperatorButton("*")}
      <NumButtons onNumberClick={onNumberClick} />
      {renderOperatorButton("-")}
      {renderOperatorButton("+")}
      <button
        onClick={onEqualsClick}
        className={styles.opButton}
        id="equal-button"
      >
        =
      </button>
    </div>
  );
};

export default CalculatorButtons;
