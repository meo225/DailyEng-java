package com.dailyeng.repository;

import com.dailyeng.entity.TopicGroup;
import com.dailyeng.entity.enums.HubType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TopicGroupRepository extends JpaRepository<TopicGroup, String> {
    List<TopicGroup> findByHubTypeOrderByOrderAsc(HubType hubType);
}
