package com.huthiafa.calculator.calculator_backend.controller;

import com.huthiafa.calculator.calculator_backend.DTO.CalculationRequest;
import org.springframework.web.bind.annotation.*;
import com.huthiafa.calculator.calculator_backend.service.CalculatorService;

@RestController
@CrossOrigin(origins = "*")
public class CalculatorController {

    @PostMapping("/calculate")
    public String evaluateExpression(@RequestBody CalculationRequest request) throws Exception {
        return new CalculatorService().evaluateExpression(request.getExpressionStr());
    }

}
