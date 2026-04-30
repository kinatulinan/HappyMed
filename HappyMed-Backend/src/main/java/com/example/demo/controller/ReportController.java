package com.example.demo.controller;

import com.example.demo.dto.ReportDTO;
import com.example.demo.service.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/financials")
    public List<ReportDTO> getFinancials() {
        return reportService.getFinancialReports();
    }

    @GetMapping("/financials/history")
    public List<ReportDTO> getFinancialHistory() {
        return reportService.getFinancialHistory();
    }

    @GetMapping("/financials/itemized")
    public List<java.util.Map<String, Object>> getItemizedHistory() {
        return reportService.getItemizedHistory();
    }
}
