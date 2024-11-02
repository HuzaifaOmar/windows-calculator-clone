/*************  ✨ Codeium Command 🌟  *************/
import React, { useState, useEffect } from "react";
import CalculatorButtons from "./components/CalculatorButtons/CalculatorButtons";
import "./index.css";

const Calculator = () => {
  const [expression, setExpression] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [errorText, setErrorText] = useState("");
  const API_URL = "http://localhost:8080";

  const handleEqualsClick = async () => {
    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expressionStr: displayText }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.text();
      setDisplayText(result);
      setExpression([result]);
      setErrorText("");
    } catch (error) {
      setErrorText(error.message);
    }
  };

  const isLastElementNumber = () => {
    if (expression.length === 0) return false;
    const lastElement = expression[expression.length - 1];
    return !isNaN(lastElement) || isLastElementFunction();
  };

  const isLastElementFunction = () => {
    const lastElement = expression[expression.length - 1];
    return (
      ["sqrt", "1/", "(-"].some((prefix) => lastElement.startsWith(prefix)) ||
      ["^2"].some((suffix) => lastElement.endsWith(suffix))
    );
  };

  const handleNumberClick = (number) => {
    setErrorText("");
    const updatedExpression = [...expression];
    const lastElement = updatedExpression[updatedExpression.length - 1];

    if (!updatedExpression.length && number !== "negate") {
      updatedExpression.push(number);
    } else if (number === ".") {
      if (!lastElement.includes(".") && !isNaN(lastElement)) {
        updatedExpression[updatedExpression.length - 1] = `${lastElement}.`;
      }
    } else if (number === "negate") {
      if (isLastElementNumber()) {
        updatedExpression[updatedExpression.length - 1] =
          lastElement.startsWith("(-")
            ? lastElement.slice(2, -1)
            : `(-${lastElement})`;
      }
    } else if (!isNaN(lastElement)) {
      updatedExpression[
        updatedExpression.length - 1
      ] = `${lastElement}${number}`;
    } else if (["+", "-", "*", "/", "%"].includes(lastElement)) {
      updatedExpression.push(number);
    } else {
      setErrorText("Cannot add another number without an operator");
    }

    setExpression(updatedExpression);
  };

  const handleOperatorClick = (operator) => {
    setErrorText("");
    const updatedExpression = [...expression];
    if (!updatedExpression.length) return;
    const lastElement = updatedExpression[updatedExpression.length - 1];

    if (operator === "√" || operator === "1/x" || operator === "x^2") {
      if (isLastElementNumber()) {
        if (operator === "√") {
          updatedExpression[
            updatedExpression.length - 1
          ] = `sqrt(${lastElement})`;
        } else if (operator === "1/x") {
          updatedExpression[updatedExpression.length - 1] = `1/${lastElement}`;
        } else if (operator === "x^2") {
          updatedExpression[updatedExpression.length - 1] = `${lastElement}^2`;
        }
      } else {
        setErrorText("There is no number to operate on");
      }
    } else if (["+", "-", "*", "/"].includes(lastElement)) {
      updatedExpression[updatedExpression.length - 1] = operator;
    } else if (isLastElementNumber()) {
      updatedExpression.push(operator);
    }

    setExpression(updatedExpression);
  };

  const handleClearClick = () => {
    setExpression([]);
    setDisplayText("");
    setErrorText("");
  };

  const handleBackspaceClick = () => {
    const updatedExpression = [...expression];
    const lastElement = updatedExpression.pop();
    if (lastElement?.startsWith("1/")) {
      updatedExpression.push(lastElement.slice(2));
    } else if (lastElement?.endsWith("^2")) {
      updatedExpression.push(lastElement.slice(0, -2));
    } else if (lastElement?.startsWith("sqrt")) {
      updatedExpression.push(lastElement.slice(5, -1));
    } else if (lastElement?.startsWith("(-")) {
      updatedExpression.push(lastElement.slice(2, -1));
    } else if (lastElement.length > 1) {
      updatedExpression.push(lastElement.slice(0, -1));
    }
    setExpression(updatedExpression);
  };

  useEffect(() => {
    setDisplayText(expression.join(""));
  }, [expression]);

  return (
    <div className="calculator-container">
      <div className="calculator-display">{displayText}</div>
      <div className="calculator-error-display">{errorText}</div>
      <CalculatorButtons
        onNumberClick={handleNumberClick}
        onOperatorClick={handleOperatorClick}
        onClearClick={handleClearClick}
        onBackspaceClick={handleBackspaceClick}
        onEqualsClick={handleEqualsClick}
      />
    </div>
  );
};

export default Calculator;
