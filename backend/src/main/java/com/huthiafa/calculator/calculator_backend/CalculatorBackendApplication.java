package com.huthiafa.calculator.calculator_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.huthiafa.calculator.calculator_backend.service.CalculatorService;

@SpringBootApplication
public class CalculatorBackendApplication {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(CalculatorBackendApplication.class, args);
    }
}
