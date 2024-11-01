package com.huthiafa.calculator.calculator_backend.service;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public String evaluateExpression(String expressionStr) throws Exception {
        Expression expression = new ExpressionBuilder(expressionStr).build();
        double result = expression.evaluate();
        if (Double.isNaN(result))
            throw new ArithmeticException("Not a Number");
        return String.valueOf(result);

    }
}