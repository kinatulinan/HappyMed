package com.example.demo.service;

import com.example.demo.dto.ReportDTO;
import com.example.demo.entity.Medicine;
import com.example.demo.entity.StockOut;
import com.example.demo.repository.MedicineRepository;
import com.example.demo.repository.StockOutRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final StockOutRepository stockOutRepository;
    private final MedicineRepository medicineRepository;

    public ReportService(StockOutRepository stockOutRepository, MedicineRepository medicineRepository) {
        this.stockOutRepository = stockOutRepository;
        this.medicineRepository = medicineRepository;
    }

    public List<ReportDTO> getFinancialReports() {
        List<ReportDTO> reports = new ArrayList<>();
        LocalDate today = LocalDate.now();

        // 1. Today
        List<StockOut> dailyOuts = stockOutRepository.findByDateDispensedBetween(today, today);
        String todayStr = "Today (" + today.format(DateTimeFormatter.ofPattern("MMM dd, yyyy")) + ")";
        reports.add(calculateReport(todayStr, dailyOuts));

        // 2. This Month
        YearMonth currentMonth = YearMonth.now();
        LocalDate startOfMonth = currentMonth.atDay(1);
        LocalDate endOfMonth = currentMonth.atEndOfMonth();
        List<StockOut> monthlyOuts = stockOutRepository.findByDateDispensedBetween(startOfMonth, endOfMonth);
        String monthStr = "This Month (" + currentMonth.format(DateTimeFormatter.ofPattern("MMMM yyyy")) + ")";
        reports.add(calculateReport(monthStr, monthlyOuts));

        // 3. This Year
        LocalDate startOfYear = today.withDayOfYear(1);
        LocalDate endOfYear = today.withDayOfYear(today.lengthOfYear());
        List<StockOut> yearlyOuts = stockOutRepository.findByDateDispensedBetween(startOfYear, endOfYear);
        String yearStr = "This Year (" + today.getYear() + ")";
        reports.add(calculateReport(yearStr, yearlyOuts));

        return reports;
    }

    public List<ReportDTO> getFinancialHistory() {
        List<ReportDTO> history = new ArrayList<>();
        LocalDate today = LocalDate.now();
        
        // Retrieve day-by-day history for the last 30 days
        for (int i = 1; i <= 30; i++) {
            LocalDate date = today.minusDays(i);
            List<StockOut> dailyOuts = stockOutRepository.findByDateDispensedBetween(date, date);
            
            // Only add days that actually had sales to keep the history clean
            if (!dailyOuts.isEmpty()) {
                String dateStr = date.format(DateTimeFormatter.ofPattern("MMM dd, yyyy"));
                history.add(calculateReport(dateStr, dailyOuts));
            }
        }
        return history;
    }

    public List<Map<String, Object>> getItemizedHistory() {
        List<Map<String, Object>> history = new ArrayList<>();
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(30);
        
        List<StockOut> recentOuts = stockOutRepository.findByDateDispensedBetween(startDate, today);
        
        // Sort newest first
        recentOuts.sort((a, b) -> b.getDateDispensed().compareTo(a.getDateDispensed()));
        
        for (StockOut out : recentOuts) {
            Medicine m = medicineRepository.findById(out.getMedicineId()).orElse(null);
            if (m != null && out.getQuantitySold() != null) {
                int qty = out.getQuantitySold();
                double sPrice = m.getSellingPrice() != null ? m.getSellingPrice() : 0.0;
                double uPrice = m.getUnitPrice() != null ? m.getUnitPrice() : 0.0;
                
                double rev = qty * sPrice;
                double prof = qty * (sPrice - uPrice);
                
                Map<String, Object> map = new HashMap<>();
                map.put("date", out.getDateDispensed().format(DateTimeFormatter.ofPattern("MMM dd, yyyy")));
                
                map.put("itemName", m.getItemName());
                map.put("quantitySold", qty);
                map.put("revenue", Math.round(rev * 100.0) / 100.0);
                map.put("profit", Math.round(prof * 100.0) / 100.0);
                
                history.add(map);
            }
        }
        return history;
    }

    private ReportDTO calculateReport(String period, List<StockOut> outs) {
        int totalSold = 0;
        double revenue = 0.0;
        double profit = 0.0;

        for (StockOut out : outs) {
            if (out.getQuantitySold() == null) continue;
            
            Medicine m = medicineRepository.findById(out.getMedicineId()).orElse(null);
            if (m != null) {
                int qty = out.getQuantitySold();
                totalSold += qty;
                
                double sPrice = m.getSellingPrice() != null ? m.getSellingPrice() : 0.0;
                double uPrice = m.getUnitPrice() != null ? m.getUnitPrice() : 0.0;
                
                revenue += (qty * sPrice);
                profit += (qty * (sPrice - uPrice));
            }
        }
        return new ReportDTO(period, totalSold, Math.round(revenue * 100.0) / 100.0, Math.round(profit * 100.0) / 100.0);
    }
}
