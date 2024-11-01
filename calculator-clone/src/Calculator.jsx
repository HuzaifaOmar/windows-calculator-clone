import React, { useState, useEffect } from "react";
import CalculatorButtons from "./components/CalculatorButtons/CalculatorButtons";
import "./index.css";

const Calculator = () => {
  const [expression, setExpression] = useState(["0"]);
  const [displayText, setDisplayText] = useState("");

  const handleNumberClick = (number) => {
    let newExpression = [...expression];
    if (number === "negate") {
      if (!newExpression.length) return;
      if (isNaN(newExpression[newExpression.length - 1])) return;
      newExpression[newExpression.length - 1] =
        -newExpression[newExpression.length - 1];
    } else if (number === ".") {
      if (!newExpression.length || isNaN(newExpression[newExpression.length - 1])) {
        newExpression.push(`0${number}`);
      } else if (
        !newExpression[newExpression.length - 1].includes(".")
      ) {
        newExpression[newExpression.length - 1] = `${
          newExpression[newExpression.length - 1]
        }${number}`;
      }
    } else if (isNaN(newExpression[newExpression.length - 1])) {
      newExpression.push(number);
    } else {
      newExpression[newExpression.length - 1] = `${
        newExpression[newExpression.length - 1]
      }${number}`;
    }
    setExpression(newExpression);
  };

  const handleOperatorClick = (operator) => {
    let newExpression = [...expression];
    if (!newExpression.length) return;
    if (isNaN(newExpression[newExpression.length - 1])) {
      newExpression.pop();
      newExpression.push(operator);
    } else {
      newExpression.push(operator);
    }
    setExpression(newExpression);
  };

  const handleClearClick = () => {
    setExpression(["0"]);
  };

  useEffect(() => {
    setDisplayText(expression.join(""));
  }, [expression]);

  return (
    <div className="calculator-container">
      <div className="calculator-display">{displayText}</div>
      <CalculatorButtons
        onNumberClick={handleNumberClick}
        onOperatorClick={handleOperatorClick}
        onClearClick={handleClearClick}
      />
    </div>
  );
};

export default Calculator;

