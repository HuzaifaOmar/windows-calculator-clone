package com.huthiafa.calculator.calculator_backend.controller;

import com.huthiafa.calculator.calculator_backend.DTO.CalculationRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.huthiafa.calculator.calculator_backend.service.CalculatorService;

@RestController
@RequestMapping("/calculator")
public class CalculatorController {

    @PostMapping("/evaluate")
    public String evaluateExpression(@RequestBody CalculationRequest request) throws Exception {
        return new CalculatorService().evaluateExpression(request.getExpressionStr());
    }

}
