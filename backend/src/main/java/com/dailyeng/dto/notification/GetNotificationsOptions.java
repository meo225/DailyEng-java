package com.dailyeng.dto.notification;

public class GetNotificationsOptions {
    private Integer page = 1;
    private Integer limit = 10;
    private String sortOrder = "newest"; // "newest" hoặc "oldest"
    private String searchQuery = "";

    public GetNotificationsOptions() {
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public String getSearchQuery() {
        return searchQuery;
    }

    public void setSearchQuery(String searchQuery) {
        this.searchQuery = searchQuery;
    }
}
