package com.example.demo.dto;

public class ReportDTO {
    private String period;
    private int totalSoldItems;
    private double totalRevenue;
    private double totalProfit;

    public ReportDTO() {}

    public ReportDTO(String period, int totalSoldItems, double totalRevenue, double totalProfit) {
        this.period = period;
        this.totalSoldItems = totalSoldItems;
        this.totalRevenue = totalRevenue;
        this.totalProfit = totalProfit;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public int getTotalSoldItems() {
        return totalSoldItems;
    }

    public void setTotalSoldItems(int totalSoldItems) {
        this.totalSoldItems = totalSoldItems;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getTotalProfit() {
        return totalProfit;
    }

    public void setTotalProfit(double totalProfit) {
        this.totalProfit = totalProfit;
    }
}
